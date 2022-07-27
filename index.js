let myLeads = [];
const storageLeads = JSON.parse(localStorage.getItem("myLeads"));
const inputEl = document.getElementById("input-el")
const button = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const render = (leads) => {
    let listItems = ""
for(let i = 0; i<myLeads.length; i++){
    listItems += '<li>' + `<a href = "${leads[i]}" target = "_blank">` + leads[i] + "</a>" + "</li>"  

}
ulEl.innerHTML = listItems; 
}

if(storageLeads){
    myLeads = storageLeads;
    render(myLeads)
}

button.addEventListener("click", ()=>{
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
    render(myLeads);
    inputEl.value = "";
})

tabBtn.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", ()=>{
    myLeads = [];
    localStorage.clear()
    render(myLeads)
})