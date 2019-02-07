function applyBonus(employees, bonus){
    return new Promise((resolve,reject)=>{
        if(typeof bonus !== 'number'){
            reject(new Error("Invalid Bonus"))
        }
        for(let i = 0;i<employees.length;i++){
            if(!(typeof employees[i].name ==='string')&&!(typeof employees[i].salary==='number')){
                 reject(new Error("Invalid Bonus"))
            }
        }
        
        var maxSal = Math.max.apply(Math,employees.map((evt)=>{return evt.salary}))
        if(bonus >= maxSal/10){
            resolve(employees.map(employee =>{
                return{
                    ...employee,salary:employee.salary+bonus
                }
            }))
        }else{
             reject("Bonus too small")
        }
    })
}

let app = {
    applyBonus: applyBonus,
}

module.exports = app;