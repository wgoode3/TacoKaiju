// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$("#toggle").click( function(){
    let buttontext = $("#toggle").text();
    if(buttontext === "Add Tacos") {
        $("#toggle").text("Don't Add Tacos");
        $("#toggle").removeClass("btn-primary");
        $("#toggle").addClass("btn-danger");
    } else {
        $("#toggle").text("Add Tacos");
        $("#toggle").removeClass("btn-danger");
        $("#toggle").addClass("btn-primary");
    }
    $("#form").toggle();
});


function getData(element) {
    const data = {};
    function helper(element) {
        if(element.nodeName === "INPUT" || element.nodeName === "SELECT" || element.nodeName === "TEXTAREA") {
            data[element.name] = element.value;
        } else {
            element.childNodes.forEach(c => helper(c));
        }
    }
    helper(element);
    return data;
}


function removeData(element) {
    function helper(element) {
        if(element.nodeName === "INPUT" || element.nodeName === "SELECT" || element.nodeName === "TEXTAREA") {
            element.value = "";
        } else {
            element.childNodes.forEach(c => helper(c));
        }
    }
    helper(element);
}


$("#form").submit( function(e) {
    e.preventDefault();
    const formdata = getData(e.target);
    $.post("/taco", formdata, function(data){
        if(data.msg === "ok")
        {
            $("#tacos").append(`
                <tr>
                    <td>${formdata.ShellType}</td>
                    <td>${formdata.Protein}</td>
                    <td>${formdata.Calories}</td>
                    <td>${formdata.Fillings}</td>
                </tr>
            `);
            removeData(e.target);
            ["Calories", "ShellType", "Protein", "Fillings"].forEach(type => {
                $("#" + key).children().eq(1).removeClass("is-invalid");
                $("#" + type).children().last().text("");
            })
        } else {
            for(let key in data.errors){
                if(data.errors[key].length > 0) {
                    $("#" + key).children().eq(1).addClass("is-invalid");
                    $("#" + key).children().last().text(data.errors[key]);
                } else {
                    $("#" + key).children().eq(1).removeClass("is-invalid");
                    $("#" + key).children().last().text("");
                }
            };
        }
    });
});