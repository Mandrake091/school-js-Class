import { Attribute } from "./attribute.js";
import { SchoolClass } from "./schoolClass.js";
import { Student } from "./student.js";

let arrClasses = [['Prima','13'],['Seconda','14'],['Terza','15'],['Quarta','16'],['Quinta','17'],]
let mapClasses = new Map()
for (const selectedCLass of arrClasses) {
    mapClasses.set(mapClasses.size,new SchoolClass(...selectedCLass)) 
    $("#classes").append(`<ul id=${mapClasses.size}><li><h3>${selectedCLass[0]}</h3></li></ul>`);
}


function createStudent() {
    const student = new Student($('#input-name').val(), $('#input-surname').val(), $('#input-birthday').val());

    let validation = student.validate();

    if(!validation.success) {
        throw err //alert
    }

    switch ($('#input-class').val()) {
        case '1':
            
        break
        default:
            throw err //alert
    }

    // for (const attribute in student.attributes) {
    //     let attr 
    //         switch (student.attributes[attribute].type) {
    //             case 'string':
    //                 attr = String(attr)
    //                 break;
    //             case 'number':
    //                 attr = Number(attr)
    //                 break;
    //             case 'date':
    //                 attr = new Date(attr)
    //                 if (attr == 'Invalid Date') attr = ''
    //         }
    //     }
    // }
    
}

function renderClass(studentParams) { //QUESTO VA SISTEMATO PER IL NUOVO FE
    $(`#${studentParams[1]}`).append(`
    <li id=${studentParams[0].id} class="student">
        Name: ${studentParams[0].name} ,
        Surname: ${studentParams[0].surname} ,
        Birthday: ${studentParams[0].birthday.toISOString()} 
    </li>`);
}

function editStudent(e) {
    let idStudent = e.target.id //id dello studente dove ho appena cliccato 
    var idParent = e.target.parentElement.id; //id della classe padre (la ClassRoom dello studente)
    let isStudent = mapClasses.get(Number(idParent)).studentClass.find(elem => elem.id == idStudent)
    console.log(isStudent)
}

$(document).ready(function(){
    $('#new-student').click(function() {
        let student = createStudent()
        mapClasses.get(Number(student[1])).studentClass.push(student[0])
        renderClass(student)
        console.log(mapClasses)
    })

    $(document).on('click', '.student', e=> editStudent(e))
});

