$(function() {
    $( "#resizable" ).resizable({
containment: "#container"
});
    $( "#draggable" ).draggable({containment: "#container"});
});