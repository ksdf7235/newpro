const calculate = document.querySelector("#cal")
let cal = 0;


const upDown = document.querySelectorAll("#updown").forEach(
    (item,idx,a) => {
        const select = item.querySelector("input");
        const pay =parseInt(item.querySelector("#pay").innerText);
        let change = select.value;
        cal += pay*select.value;
        item.querySelector("#down").addEventListener("click",() => {
            select.value--
            cal -= pay;
            change = select.value;
            calculate.value = cal;
        });
        
        item.querySelector("#up").addEventListener("click", () => {
            select.value++
            cal += pay;
            change = select.value;
            calculate.value = cal;
        });   
        
        select.addEventListener("change",(e)=>
        {   
            cal -= change*pay;
            cal += select.value*pay;
            change = select.value;
            calculate.value = cal; 
        }
        );
        
      }
        
 );

    
