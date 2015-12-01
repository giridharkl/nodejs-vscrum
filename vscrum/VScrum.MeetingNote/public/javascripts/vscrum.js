var Vscrum = {

    addToSelect: function (selectId, txtInputId)
    {
        $("#" + selectId).append($("<option selected></option>")
        .val($("#" + txtInputId).val())
        .html($("#" + txtInputId).val()));
    },

    AlertMsg: function (msg){
        alert(msg);
    }



};