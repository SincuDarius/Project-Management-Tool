(function () {

  var items = [];

  function store(key, value) {
    window.localStorage[key] = JSON.stringify(value);
  }

  //get initial values from DB(in our case localStorage)
  function getValues(key) {
    //as string in localStorage
    var storedValues = window.localStorage[key];
    if (!storedValues) {
      storedValues = "";
    }
    items = storedValues ? JSON.parse(storedValues) : [];
  }

  function bindValues(items) {
    var list = document.querySelector('#itemsList');
    list.innerHTML = "";
    items.forEach(item => {
      list.innerHTML += `<tr class="number" id="` + item.id + `"> 
                          <td>
                            <select name="type" id="` + item.id + `type">
                            <option ` + (item.type == "FEATURES" ? `selected` : ``) + ` value="FEATURES">Features</option>
                            <option ` + (item.type == "BUGS" ? `selected` : ``) + ` value="BUGS">Bugs</option>
                            <option ` + (item.type == "TASKS" ? `selected` : ``) + ` value="TASKS">Tasks</option>
                            </select>
                          </td>
                          <td id="` + item.id + `name">` + item.name + `</td>
                          <td>
                            <select id="` + item.id + `status">
                              <option value="New"` + (item.status == "New" ? `selected` : ``) + `>New</option>
                              <option value="In Progres"  ` + (item.status == "In Progres" ? `selected` : ``) + ` >In Progres</option>
                              <option value="Feedback"  ` + (item.status == "Feedback" ? `selected` : ``) + ` >Feedback</option>
                              <option value="Rework"  ` + (item.status == "Rework" ? `selected` : ``) + ` >Rework</option>
                              <option value="Resolved"  ` + (item.status == "Resolved" ? `selected` : ``) + ` >Resolved</option>
                              <option value="Ready for Testing"  ` + (item.status == "Ready for Testing" ? `selected` : ``) + ` >Ready for Testing</option>
                          </select>
                         </td>    
                         <td>
                            <textarea name="comments" id="` + item.id + `comments" class="form-control" placeholder="Comments">`+ item.comments +`</textarea>
                        </td>
                        <td><button onclick="updateItem(this)">update</button></td>
                          </tr>`
    });
  }

  function updateItem(thisButton) {
    var currentTr = thisButton.parentElement.parentElement;
    var currentItem = items.find(function (item) {
      return item.id == currentTr.id;
    });
    currentItem.type = document.getElementById(currentTr.id + "type").value;
    // currentItem.name = document.getElementById(currentTr.id + "name").value;
    currentItem.status = document.getElementById(currentTr.id + "status").value;
    currentItem.comments = document.getElementById(currentTr.id + "comments").value;

    store('items', items);
  }

  

  function setnumberOfItems() {
    var number = document.querySelectorAll('.number').length || 0;
    document.getElementById("itemLength").innerHTML = number;
  }

  //add a listener to form for submit
  //will save in DB (local storage in our case)
  document.querySelector('form').addEventListener('submit', function (e) {
    var type = document.getElementById("type"),
      status = document.getElementById("status"),
      name = document.getElementById("name"),
      comments = document.getElementById("comments");
    e.preventDefault();
    items.push({
      id: Math.random(),
      type: type.value,
      name: name.value,
      status: status.value,
      comments: comments.value
    })
    store('items', items);
    bindValues(items);
    setnumberOfItems();
    name.value = "";
    comments.value = "";
  }, false);

  this.store = store;
  this.updateItem = updateItem;
  this.bindValues = bindValues;
  this.getValues = getValues;

  //get values from DB
  getValues('items');
  //wrap and bind values
  bindValues(items, '#itemsList');
  setnumberOfItems();
})();



