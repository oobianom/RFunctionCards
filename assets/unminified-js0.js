function addTrans(thiss) {
        var val2 = $(thiss).val();

        var codelines = $(thiss).val().split('\n');
        codelines = $.grep(codelines, n => n.replace(/\s/g, '') != "");

        var titleget = '<span class="text-blue-400">' + codelines[0].split("(")[0].replace(/\s/g, '') + '</span>';

        codelines.shift();
        codelines.pop();
        var argscomb = "";
        codelines.forEach(function(item, index) {
            var splitArg = item.split("=");
            var argName = splitArg[0].replace(/\s/g, '');
            
            if(argName != "..." & argName != "...,") argName = argName + " = ";
            splitArg.shift()
            splitArg = splitArg.join("=");
            argscomb = argscomb + "<p><div class='inline-block px-6'>" +
                argName  + '<span class="text-yellow-400">' + splitArg + "</span></div></p>";
        })

        var combineall = "<p>" + titleget + "(<p>" + replaceColors(argscomb) + "<p>)</p>";
        $('#otuput2').html(combineall);

    }

function replaceColors(str) {
    var str1 = str.replaceAll("true", '<span class="text-green-500">true</span>').replaceAll("TRUE", '<span class="text-green-500">TRUE</span>').replaceAll("false", '<span class="text-red-500">false</span>').replaceAll("FALSE", '<span class="text-red-500">FALSE</span>').replaceAll("c(", '<span class="text-white">c(</span>').replaceAll("list(", '<span class="text-white">list(</span>').replaceAll("(", '<span class="text-white">(</span>').replaceAll(")", '<span class="text-white">)</span>').replaceAll(",", '<span class="text-white">,</span>').replaceAll("...", '<b class="text-yellow-300 text-md">...</b>').replaceAll("null", '<span class="text-gray-600">null</span>').replaceAll("NULL", '<span class="text-gray-600">NULL</span>');
    return (str1);
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

$(function() { 
    $("#downloadbtn").click(function() { 
	html2canvas(document.querySelector("#otuput"),{scale:3}).then(canvas => {
    //document.body.appendChild(canvas)
	var image = canvas.toDataURL('image/png', 1.0);
                saveAs(image, 'exported-function.png') 
});
       
    });

    
//portion for transformation

    $("#cont").bind('input propertychange', () => addTrans("#cont"));
    
    addTrans("#cont")

});