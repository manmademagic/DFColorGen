$(document).ready(function() {
    generateMap("map")
    generateStones("stones")
    generateCreatures("creatures")
    getColorSchemes(colorschemes)
    fileUpload()
})

function getColorSchemes(colorSchemes) {
    colorSchemes.sort()
    colorSchemes.forEach(function(colorScheme) {
        $(document.createElement("option"))
            .attr("value", colorScheme[0])
            .append(colorScheme[1])
            .appendTo("#presetSelector")
    })
}

function fileUpload() {
    var fileInput = document.getElementById("fileUpload")
    fileInput.addEventListener("change", function(e) {
        var file = fileInput.files[0]
        var textType = /text.*/
        document.getElementById("fileName").value = file.name
        if (file.type.match(textType)) {
            var reader = new FileReader()
            reader.onload = function(e) {
                document.getElementById("presetSelector").value = ""
                regexExtraction("BLACK", "backgroundColor", reader.result)
                regexExtraction("BLUE", "color", reader.result)
                regexExtraction("GREEN", "color", reader.result)
                regexExtraction("CYAN", "color", reader.result)
                regexExtraction("RED", "color", reader.result)
                regexExtraction("MAGENTA", "color", reader.result)
                regexExtraction("BROWN", "color", reader.result)
                regexExtraction("LGRAY", "color", reader.result)
                regexExtraction("DGRAY", "color", reader.result)
                regexExtraction("LBLUE", "color", reader.result)
                regexExtraction("LGREEN", "color", reader.result)
                regexExtraction("LCYAN", "color", reader.result)
                regexExtraction("LRED", "color", reader.result)
                regexExtraction("LMAGENTA", "color", reader.result)
                regexExtraction("YELLOW", "color", reader.result)
                regexExtraction("WHITE", "color", reader.result)
            }
            reader.readAsText(file)
        }
    })
}

function generateCreatures(creatureTableID) {
    var creatureSection = $("#" + creatureTableID)
    var categories = Object.keys(creatures)

    categories.forEach(function(category, categoryIndex) {
        var categoryId = "category-" + categoryIndex

        $(document.createElement("div"))
            .addClass("F-WHITE category")
            .attr("id", categoryId)
            .text(category)
            .appendTo(creatureSection)

        $(document.createElement("div"))
            .addClass("F-WHITE category-items")
            .appendTo($("#" + categoryId))

        creatures[category].forEach(function(creature, creatureIndex) {
            var creatureId = categoryId + "-" + creatureIndex

            $(document.createElement("div"))
                .attr("id", creatureId)
                .appendTo($("#" + categoryId + ">.category-items"))

            $(document.createElement("span"))
                .addClass("F-" + creature[2] + " creature-icon")
                .append(creature[0])
                .appendTo($("#" + creatureId))

            $(document.createElement("span"))
                .addClass("F-" + creature[2])
                .append(creature[1])
                .appendTo($("#" + creatureId))
        })
    })
}

function generateMap(mapTableID) {
    var tbody = $("#" + mapTableID + ">tbody")

    for (var row = 0; row < map.length; row++) {
        $(document.createElement("tr")).appendTo(tbody)
        for (var column = 0; column < map[row].length; column++) {
            $(document.createElement("td")).appendTo(tbody.children()[row])
            $(tbody.children()[row].children[column]).append(
                '<div class="F-' +
                    map[row][column][1] +
                    '">' +
                    map[row][column][0] +
                    "</div>"
            )
        }
    }
}

function generateStones(stoneTableID) {
    var tbody = $("#" + stoneTableID + ">tbody")

    for (var row = 0; row < stones.length; row++) {
        $(document.createElement("tr")).appendTo(tbody)
        for (var column = 0; column < stones[row].length; column++) {
            $(document.createElement("td")).appendTo(tbody.children()[row])
            $(tbody.children()[row].children[column]).append(
                '<div class="F-' +
                    stones[row][column][2] + 
                    ' B-' +
                    stones[row][column][3] +
                    '" title="' +
                    stones[row][column][1] +
                    '">' +
                    stones[row][column][0] +
                    '</div>'
            )
        }
    }
}

function colorChange(colorName) {
    document.body.style.setProperty("--" + colorName, 
        "#" + document.getElementById(colorName + "_PICKER").value)
}

function presetSelect() {
    var selected = document.getElementById("presetSelector").value
    if (selected != "") {
        var path = "colorschemes/" + selected
        var xhr = new XMLHttpRequest()
        xhr.open("GET", path, true)
        xhr.responseType = "text"
        xhr.send()
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(xhr)
                document.getElementById(
                    "fileName"
                ).value = document.getElementById("presetSelector").value
                regexExtraction("BLACK", "backgroundColor", xhr.responseText)
                regexExtraction("BLUE", "color", xhr.responseText)
                regexExtraction("GREEN", "color", xhr.responseText)
                regexExtraction("CYAN", "color", xhr.responseText)
                regexExtraction("RED", "color", xhr.responseText)
                regexExtraction("MAGENTA", "color", xhr.responseText)
                regexExtraction("BROWN", "color", xhr.responseText)
                regexExtraction("LGRAY", "color", xhr.responseText)
                regexExtraction("DGRAY", "color", xhr.responseText)
                regexExtraction("LBLUE", "color", xhr.responseText)
                regexExtraction("LGREEN", "color", xhr.responseText)
                regexExtraction("LCYAN", "color", xhr.responseText)
                regexExtraction("LRED", "color", xhr.responseText)
                regexExtraction("LMAGENTA", "color", xhr.responseText)
                regexExtraction("YELLOW", "color", xhr.responseText)
                regexExtraction("WHITE", "color", xhr.responseText)
            }
        }
    }
}

function colorPicker(picker, inputColor) {
    document.getElementById("RGB_" + inputColor + "_R").innerHTML =
        "[" + inputColor + "_R:" + Math.round(picker.rgb[0]) + "]"
    document.getElementById("RGB_" + inputColor + "_G").innerHTML =
        "[" + inputColor + "_G:" + Math.round(picker.rgb[1]) + "]"
    document.getElementById("RGB_" + inputColor + "_B").innerHTML =
        "[" + inputColor + "_B:" + Math.round(picker.rgb[2]) + "]"
    colorChange(inputColor)
}

function saveTextAsFile() {
    var textToSave = ""
    var outPutElements = document.getElementsByName("fileout")
    for (i = 0; i < outPutElements.length; i++) {
        textToSave += outPutElements[i].innerHTML + "\n"
    }
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/plain"
    })
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob)
    var fileNameToSaveAs = document.getElementById("fileName").value
    var downloadLink = document.createElement("a")
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = "Download File"
    downloadLink.href = textToSaveAsURL
    downloadLink.onclick = destroyClickedElement
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target)
}

function regexExtraction(colorName, element, inColorScheme) {
    var regex_r1 = new RegExp(colorName + "_R\\:(\\d{1,3})\\]", "i")
    var regex_g1 = new RegExp(colorName + "_G\\:(\\d{1,3})\\]", "i")
    var regex_b1 = new RegExp(colorName + "_B\\:(\\d{1,3})\\]", "i")
    var regex_r2 = new RegExp("\\[" + colorName + "_R:.*\\]", "i")
    var regex_g2 = new RegExp("\\[" + colorName + "_G:.*\\]", "i")
    var regex_b2 = new RegExp("\\[" + colorName + "_B:.*\\]", "i")
    var color_r = inColorScheme.match(regex_r1)[1]
    var color_g = inColorScheme.match(regex_g1)[1]
    var color_b = inColorScheme.match(regex_b1)[1]
    document
        .getElementById(colorName + "_PICKER")
        .jscolor.fromRGB(
            inColorScheme.match(regex_r1)[1],
            inColorScheme.match(regex_g1)[1],
            inColorScheme.match(regex_b1)[1]
        )
    document.getElementById(
        "RGB_" + colorName + "_R"
    ).innerHTML = inColorScheme.match(regex_r2)
    document.getElementById(
        "RGB_" + colorName + "_G"
    ).innerHTML = inColorScheme.match(regex_g2)
    document.getElementById(
        "RGB_" + colorName + "_B"
    ).innerHTML = inColorScheme.match(regex_b2)
    colorChange(colorName)
}
