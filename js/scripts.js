// Глобальные переменные
var guitarNeckNote = new Array();                                                       // Массив всех блоков нот на грифе гитары
var arrTask = new Array();                                                              // Массив нот, задействованных в тесте
var countTask = 10;                                                                     // Количество заданий в тесте
var curTask = 0;                                                                        // Номер текущего задания в arrTask
var numberTask = 1;                                                                     // Номер текущего задания теста
var rightAnswer = 0;                                                                    // Правильных ответов дано
var answerDone = 0;                                                                     // Был ли дан ответ на задание

// Вывод изображения нот на гриф гитары
function noteNeck() {
    var noteArr = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];               // Массив с названием нот
    // Строй гитары от 1й к 6й струне (в данном случае классический)
    // Обозначение октав: 0 - малая октава, 1 - первая октава, 2 - вторая, 3 - третья
    var guitarFormation = [                                                            
        ['E',2],
        ['B',1],
        ['G',1],
        ['D',1],
        ['A',0],
        ['E',0],
    ];
                                           
    let arrShistNote = [32,38,50,45,40,37,35,30,27,25,22,18,15,14,13,10,9,6,5,3,2]      // Массив сдвигов блоков на изображении грифа                                           
    for (let i = 0; i < 6; i++) {
        let firstNote = guitarFormation[i][0];                              // Нота открытой i-ой струны (начиная с первой)
        let firstOctave = guitarFormation[i][1];                            // Октава ноты открытой i-ой струны (начиная с первой)
        let firstNoteIndx = noteArr.indexOf(firstNote,0);                   // Номер ноты firstNote в массиве названий нот
        let newGuitarString = $("<div class = 'stringNeck'></div>").appendTo("#guitarNeck"); 
        for (let j = 0; j < 21; j++) {
            let newNote = $("<div class = 'noteNeck'>"+noteArr[firstNoteIndx]+"</div>").appendTo(newGuitarString).css("margin","0 0 0 " + arrShistNote[j] + "px");
            $(newNote).attr("onclick","pushNote("+(21 * i + j)+")");
            $(newNote).attr({'data-id':21 * i + j,'data-note':noteArr[firstNoteIndx],'data-octave':firstOctave});
            $(newNote).css("background-color", colorOctave(String(firstOctave)));
            firstNoteIndx++;
            if (firstNoteIndx > noteArr.length - 1) {
                firstNoteIndx = 0;
                firstOctave++;
            }
            //colorOctave(newNote);
            guitarNeckNote.push(newNote);
        }
    }                                          
}

// Определяет цвет ноты на грифе по номеру октавы
function colorOctave(octaveName) {
    let octaveColor = "";
    switch(octaveName) {
        case "0": octaveColor = "yellow"; break;
        case "1": octaveColor = "aqua"; break;
        case "2": octaveColor = "red"; break;
        case "3": octaveColor = "pink"; break;
        case "4": octaveColor = "blue"; break;
    }
    return octaveColor;
}

// Обработчик нажатия на ноту. Проигрывание звука ноты
function pushNote(idNote) {
    let noteName = $(guitarNeckNote[idNote]).attr('data-note');
    if (noteName.length == 2) {
        noteName = noteName[0] + "s";
    }
    let octaveName = $(guitarNeckNote[idNote]).attr('data-octave');
    let soundNote = new Audio();
    soundNote.src = "/audio/sample_guitar_note/" + noteName + octaveName + ".mp3";
    soundNote.play();
}

function showNoteControlMenu() {
    let elemNoteMenuArr = ['Показать все ноты', ''];
    let newElem = $("<div class = 'noteControlMenuButton'></div>").appendTo(noteControlMenu);
}

// Показать\скрыть ноты определенной октавы
function showHideOctave(idOctave) {
    cb = document.getElementById(idOctave);
    let octaveN = idOctave[idOctave.length - 1];
    let visOrNot = "";
    if (cb.checked) {
        visOrNot = "visible";
    }
    else {
        visOrNot = "hidden";
    }
    for (let i = 0; i < guitarNeckNote.length; i++) {
        if ($(guitarNeckNote[i]).attr('data-octave') == octaveN) {
            $(guitarNeckNote[i]).css("visibility",visOrNot)
        }
    }
}

// Задает начальные настройки теста
function startTest() {
    $("#startTestBlock").css("display","none");
    $("#noteControlMenu").css("display","none");
    $("#settingsTest").css("display","flex");
    $("#testNoteBlock").css("display","none");
    for (let i = 0; i < guitarNeckNote.length; i++) {
        $(guitarNeckNote[i]).css("background-color","#808080");
        $(guitarNeckNote[i]).attr("onclick","pushNoteSetTest(" + i + ")");
        $(guitarNeckNote[i]).attr("data-check","false");
    }
}

// Обработчик нажатия на ноту при старте теста
function pushNoteSetTest(idNote) {
    pushNote(idNote);
    let noteName = $(guitarNeckNote[idNote]).attr("data-note");
    let octaveName = $(guitarNeckNote[idNote]).attr("data-octave");
    if ($(guitarNeckNote[idNote]).attr("data-check") == "true") {
        selectSameNote(noteName, octaveName, "#808080", "false");
    }
    else {
        selectSameNote(noteName, octaveName, colorOctave(octaveName), "true");
    }
}

// Выделение всех одинаковых нот на грифе (название ноты, октава, цвет октавы, отмечена ли в массиве теста)
function selectSameNote(noteName, octaveName, bgColorNote, checkNote) {
    for (let i = 0; i < guitarNeckNote.length; i++) {
        if ($(guitarNeckNote[i]).attr("data-note") == noteName && $(guitarNeckNote[i]).attr("data-octave") == octaveName) {
            $(guitarNeckNote[i]).css("background-color", bgColorNote);
            $(guitarNeckNote[i]).attr("data-check", checkNote);
        }
    }
}

function selectOctave(octaveName) {
    for (let i = 0; i < guitarNeckNote.length; i++) {
        if ($(guitarNeckNote[i]).attr("data-octave") == octaveName) {
            if ($(guitarNeckNote[i]).attr("data-check") == "true") {
                $(guitarNeckNote[i]).attr("data-check", "false");
                $(guitarNeckNote[i]).css("background-color","#808080");
            }
            else {
                $(guitarNeckNote[i]).attr("data-check", "true");
                $(guitarNeckNote[i]).css("background-color",colorOctave(octaveName));
            }
        }
    }
}

function testNote() {
    // Формирование массива нот, выбранных пользователем (нота, октава, номер ноты для проигрывания звука)
    arrTask = new Array()                                                   // Очистка массива нот для теста
    for (let i = 0; i < guitarNeckNote.length; i++) {
        if ($(guitarNeckNote[i]).attr("data-check") == "true") {
            let noteName = $(guitarNeckNote[i]).attr("data-note");
            let octaveName = $(guitarNeckNote[i]).attr("data-octave");
            let noteExist = false;
            for (let j = 0; j < arrTask.length; j++) {
                if (arrTask[j][0] == noteName) {
                    if (arrTask[j][1] == octaveName) {
                        noteExist = true;
                        break;
                    } 
                }
            }
            if (noteExist == false) {
                arrTask.push(new Array());
                let len = arrTask.length - 1;
                arrTask[len].push(noteName);
                arrTask[len].push(octaveName);
                arrTask[len].push(i);
            }
 
        }
    }
    if (arrTask.length < 2) {
        alert("Чтобы начать тест, пожалуйста, выберите минимум две ноты");
        startTest();
        return;
    }
    $("#settingsTest").css("display","none");
    $("#testNoteBlock").css("display","flex");
    
    for (let i = 0; i < guitarNeckNote.length; i++) {
        $(guitarNeckNote[i]).attr("onclick","pushNoteGoingTest(" + i + ")");
    }
    rightAnswer = 0;
    numberTask = 1;
    newTaskNoteTest();
}

// Генерация случайного целого числа от min до max включительно
function randomInt(min, max) {     		 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Выборка рандомной ноты из возможных и запись в переменную текущего задания
function taskTestNote() {
    let len = arrTask.length - 1;
    let randNote = randomInt(0,len);
    curTask = randNote;
}

// Прослушать ноту из задания
function listenTaskTestNote() {
    pushNote(arrTask[curTask][2]);
}

// Создает новое задание
function newTaskNoteTest() {
    taskTestNote();
    answerDone = 0;
    document.getElementById("testNoteBlock").innerHTML = "Задание " + numberTask + "/" + countTask;
    document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> Прослушайте ноту и нажмите на нее на грифе гитары");
    document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> <div class = 'button' onclick = 'listenTaskTestNote()'> Слушать </div>");
}

// Вывод на экран информации о задании, после ответа на вопрос
function taskNoteResult(answer) {
    document.getElementById("testNoteBlock").innerHTML = "Задание " + numberTask + "/" + countTask;
    if (answer) {
        document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend"," <br> Верно!");
    }
    else {
        document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend"," <br> Неверно");
    }
    numberTask++;
    if (numberTask <= countTask) {
        document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> <div class = 'button' onclick = 'newTaskNoteTest()'> Следующее задание </div>");
    }
    else {
        document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> <div class = 'button' onclick = 'resultTestNote()'> Результаты </div>");
    }
}

// Обработчик нажатий на кнопки во время теста
function pushNoteGoingTest(idNote) {
    if (answerDone == 1) {
        alert('Вы уже ответили на это задание. Пожалуйста, нажмите кнопку "Следующее".');
        return;
    }
    let noteNameRight = $(guitarNeckNote[idNote]).attr('data-note');
    let octaveNameRight = $(guitarNeckNote[idNote]).attr('data-octave');
    let noteNameAnswer = arrTask[curTask][0];
    let octaveNameAnswer = arrTask[curTask][1];
    let answer;
    pushNote(idNote);
    if (noteNameRight == noteNameAnswer && octaveNameRight == octaveNameAnswer) {
        answer = true;
        rightAnswer++;
    }
    else {
        answer = false;
    }
    answerDone = 1;
    taskNoteResult(answer);
}

// Вывод результатов теста
function resultTestNote() {
    document.getElementById("testNoteBlock").innerHTML = "Тест завершен!";
    document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> Правильных ответов: " + rightAnswer + " из " + countTask);
    document.getElementById("testNoteBlock").insertAdjacentHTML("beforeend","<br> <div class = 'button' onclick = 'startTest()'> Начать заново </div>");
}
