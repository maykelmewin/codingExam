
const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" },
];

const finalItems = transformItems(items);

/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/

function transformItems(items){
    
    for (x = 0; x < items.length; x++){
        var finalItems ;     //organized item depends on output
        var dept = 0 ;       //how dept is the file
        var container= [];   //container array for transfering data from item to finalItem
        //STEP 1 - get their parent from null,0,1,2,3... and put in container array each time;
        for (i = 0; i < items.length; i++){
            parent = items[i]["parent"];
            if (parent == null){parent = 0;} 
            if(parent == x){
                var cutOut = items.slice(i, i+1); 
                container.push(cutOut[0]);
            }
            //STEP 2 - Sort container depends on seqId
            container.sort(function(a, b) {
                return parseFloat(a.seqId) - parseFloat(b.seqId);
            });
        }
        /* 
        STEP #3
        - make a value for dept ; (0) if finalItem is empty else (+1) to its parent dept
        - transfer container data with dept to finalItem     
        */
        if (finalItems && finalItems.length){
            for (i = 0; i < finalItems.length; i++){  
                if (finalItems[i]["id"] == x){
                    dept = finalItems[i]["dept"] + 1;
                    for (j = 0; j < container.length; j++){
                        container[j]["dept"] = dept;
                    }
                    finalItems.splice(i+1, 0,...container);
                }
            }
        }else{
            dept = 0;
            for (i = 0; i < container.length; i++){
                container[i]["dept"] = dept;
            }
            finalItems = container;
        }
    }

    console.log(finalItems);

}


/* Output:
// The seqId is used for ordering within siblings.
// The depth would depend on the number of ancestors.
[
  { id: 1, seqId: 1, parent: null, depth: 0, name: 'components' },
  { id: 5, seqId: 2, parent: 1, depth: 1, name: 'AssignmentTable' },
  { id: 2, seqId: 4, parent: 5, depth: 2, name: 'index.tsx' },
  { id: 7, seqId: 5, parent: 5, depth: 2, name: 'SelectableDropdown.tsx' },
  { id: 3, seqId: 3, parent: 1, depth: 1, name: 'Sidebar' },
  { id: 4, seqId: 5, parent: 1, depth: 1, name: 'Table' },
  { id: 6, seqId: 2, parent: null, depth: 0, name: 'controllers' }
]
*/
