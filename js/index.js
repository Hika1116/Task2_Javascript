
//タスクデータを格納する配列
const taskList = []

//状態
var Status = {
    all:'すべて',
    work: '作業中',
    complete: '完了',
};

/**
 * 初期化処理
 */
init = ()=>{
    //追加ボタンのClickイベント設定
    const addButton = document.getElementById("add-button");
    addButton.addEventListener('click',()=>{
        if (!addTask()){
            return;
        }
        displayListByStatus(Status.all);
    },false);

    //ラジオボタンのChangeイベント設定
    const statusRadioList = document.getElementsByName('status');
    statusRadioList.forEach((radio)=> {
        radio.addEventListener("click", function () {
            changeRadio();
        });
    });

    
}

/**
 * 指定されたラジオボタンの状態へデータを表示します。
 */
changeRadio = ()=>{
    let status = '';
    let radioList = document.getElementsByName("status");
    radioList.forEach((radio)=>{
        if(radio.checked){
            status = radio.value;
        }
    });
    displayListByStatus(status);
}


/**
 * タスクの追加します。
 */
addTask = ()=>{
    let addText = document.getElementById("add-text");
    if (!addText.value){
        alert('メモを入力して下さい。');
        return false;
    }
    taskList.push(
        {
            "comment": addText.value,
            "status":Status.work
        }
    )
    checkRadio(Status.all);
    addText.value = '';
    return true;
};

//指定した配列番号のデータの状態を変更します。
changeStatus = (num) => {
    if (taskList[num].status === Status.work){
        taskList[num].status = Status.complete;
    }else{
        taskList[num].status =Status.work;
    }

    changeRadio();
}

/**
 * 指定した配列番号のデータを削除します。
 */
deleteTask = (num) => {
    taskList.splice(num,1);
    changeRadio();
}


/**
 * 指定した状態のデータを表示します
 */
displayListByStatus = (status) => {
    let tableBody = document.getElementById("table-body");

    while (tableBody.rows.length) {
        tableBody.deleteRow(0);
    }

    for (let i = 0; i < taskList.length; i++) {

        if (status !== Status.all && status !== taskList[i].status) {
            continue;
        }

        let row = tableBody.insertRow(-1);
        let cell1 = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);

        cell1.innerHTML = i;
        cell2.innerHTML = taskList[i].comment;

        var statusButton = document.createElement("input");
        statusButton.type = "button";
        if (taskList[i].status === Status.work) {
            statusButton.value = Status.work;
            statusButton.addEventListener('click', ()=>{
                changeStatus(i);
            }, false);
        } else {
            statusButton.value = Status.complete;
            statusButton.addEventListener('click', ()=>{
                changeStatus(i);
            }, false);
        }
        cell3.appendChild(statusButton);
        var deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "削除"
        deleteButton.addEventListener('click', ()=>{
            deleteTask(i);
        }, false);
        cell3.appendChild(deleteButton);
    }
}


/**
 * 指定した状態のラジオボタンをONにします
 */
checkRadio = (status)=>{
    let radioList = document.getElementsByName("status");
    radioList.forEach((radio) => {
        if (radio.checked) {
            radio.checked = false;
        }
        if (radio.value === status) {
            radio.checked = true;
        }
    });
}