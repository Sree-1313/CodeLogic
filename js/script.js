var myHash = new Hash({
    
    customResultDisplay: {
        'w1': {
            message: "In Worksheet w1, you got ${correctWorksheet} correct out of ${totalWorksheet} questions.",
            'q1': {
                message: "Question q1 was incorrect. The correct answer is ${correctAnswer}.",
                hint: "Hint for Q1: Remember..."
            },
            'q2': {
                message: "Question q2 was incorrect. The correct answer is ${correctAnswer}.",
                hint: "Hint for Q2: Consider..."
            },
            'q3': {
                message: "Question q3 was incorrect. The correct answer is ${correctAnswer}.",
                hint: "Hint for Q3: Consider..."
            }
            // Additional questions and hints...
        }
        // Additional worksheets...
    }
});




// question q2

$(document).ready(function () {
    // Define the correct order for the tasks
    const correctOrder = ["Wake Up", "Brush Teeth", "Wear Outfit", "Have Breakfast"];

    // Enable drag-and-drop functionality
    $(".box1").attr("draggable", "true");

    let draggedItem = null;

    // When drag starts
    $(".box1").on("dragstart", function (e) {
        draggedItem = $(this).closest(".inner-flex"); // Store the parent container being dragged
        $(this).addClass("dragging-box1"); // Highlight the dragged box1
        e.originalEvent.dataTransfer.effectAllowed = "move"; // Set the drag effect
    });

    // When drag ends
    $(".box1").on("dragend", function () {
        $(this).removeClass("dragging-box1"); // Remove highlight from the dragged box1
        draggedItem = null; // Clear dragged item
        $(".inner-flex").removeClass("drop-target"); // Clear drop target highlights
    });

    // Allow drop on the inner-flex containers
    $(".inner-flex").on("dragover", function (e) {
        e.preventDefault(); // Allow the drop event to fire
        e.originalEvent.dataTransfer.dropEffect = "move"; // Set drop effect
        $(this).addClass("drop-target"); // Highlight the potential drop target
    });

    // When the drag leaves a potential drop target
    $(".inner-flex").on("dragleave", function () {
        $(this).removeClass("drop-target"); // Remove the highlight
    });

    // When an item is dropped
    $(".inner-flex").on("drop", function () {
        const targetItem = $(this); // The item being dropped onto

        // Avoid swapping the same item with itself
        if (draggedItem && draggedItem[0] !== targetItem[0]) {
            // Rearrange the items
            if (draggedItem.index() < targetItem.index()) {
                targetItem.after(draggedItem); // Move dragged item after the target
            } else {
                targetItem.before(draggedItem); // Move dragged item before the target
            }

            // Update the numbering after each rearrangement
            updateNumbers();
        }
    });

    // Function to update the numbering of the tasks
    function updateNumbers() {
        $("#dragContainer-q2 .inner-flex").each(function (index) {
            $(this).find(".num").text(index + 1); // Update the displayed number
        });
    }
});



$(document).ready(function () {
    // Attach click event to icon1
    $('.icon1').on('click', function () {
        // Find the parent .box1 and remove it
        $(this).closest('.inner-flex').remove();
    });
});



$("#popup").dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    draggable: false,
    closeOnEscape: true,
    dialogClass: "custom-overlay",
    open: function () {
        $(".ui-dialog-titlebar").hide();
        $(this).parent().css({
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%'
        });
        $(this).css({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        });
    }
}).click(function () {
    const navigateTo = $(this).find(".result-image").data("navigate");
    $(this).dialog("close");

    if (navigateTo === "m3") {
        $('#m2').hide();
        $('#m3').show();
    } else if (navigateTo === "m4") {
        $('#m3').hide();
        $('#m4').show();
    }else if (navigateTo === "m5") {
        $('#m4').hide();
        $('#m5').show();
    } else if (navigateTo === "m6") {
        $('#m5').hide();
        $('#m6').show();
    } else if (navigateTo === "m7") {
        $('#m6').hide();
        $('#m7').show();
    } else if (navigateTo === "m8") {
        $('#m7').hide();
        $('#m8').show();
    } else if (navigateTo === "m9") {
        $('#m8').hide();
        $('#m9').show();
    } else if (navigateTo === "m10") {
        $('#m9').hide();
        $('#m10').show();
    }
    
    else if (navigateTo === "retry") {
        alert("Please try again!");
    }
});

function showCustomAlert(message) {
    // Set the message
    $("#custom-alert-message").text(message);

    // Show the alert box
    $("#custom-alert-box").fadeIn();

    // Close the alert when the button is clicked
    $("#custom-alert-close").click(function () {
        $("#custom-alert-box").fadeOut();
    });
}

$('#submit-m2').click(function () {
    // Select elements with the 'data-order' attribute
    const elements = $('[data-order]');
    const dataOrderValues = elements.map((_, el) => parseInt($(el).data('order'))).get();

    // Check if the length is exactly 4
    if (dataOrderValues.length !== 4) {
        showCustomAlert("Please ensure to choose only the correct answer and remove any extra boxes.");
                return; // Exit the function if the condition is not met
    } else{
        const isAscending = dataOrderValues.every((val, i, arr) => i === 0 || val > arr[i - 1]);

        const popupDialog = $("#popup");
    
        // Display the appropriate popup dialog
        if (isAscending) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m3" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
    
        popupDialog.dialog("open");
    }

    // Check if the values are in ascending order
    
});





// question q3
$(document).ready(function () {
    // Enable drag-and-drop functionality for .box1
    $(".box1").attr("draggable", "true");
    

    let draggedItem = null;

    // When drag starts
    $(".box1").on("dragstart", function (e) {
        draggedItem = $(this).closest(".inner-flex"); // Store the parent container being dragged
        $(this).addClass("dragging-box1"); // Highlight the dragged box1
        e.originalEvent.dataTransfer.effectAllowed = "move"; // Set the drag effect
    });

    // When drag ends
    $(".box1").on("dragend", function () {
        $(this).removeClass("dragging-box1"); // Remove highlight from the dragged box1
        draggedItem = null; // Clear dragged item
        $(".inner-flex").removeClass("drop-target"); // Clear drop target highlights
    });

    // Allow drop on the inner-flex containers
    $(".inner-flex").on("dragover", function (e) {
        e.preventDefault(); // Allow the drop event to fire
        e.originalEvent.dataTransfer.dropEffect = "move"; // Set drop effect
        $(this).addClass("drop-target"); // Highlight the potential drop target
    });

    // $(".inner-flex").on("dragleave", function () {
    //     $(this).removeClass("drop-target"); // Remove the highlight
    // });

    // When an item is dropped
    $(".inner-flex").on("drop", function () {
        const targetItem = $(this); // The item being dropped onto

        // Avoid swapping the same item with itself
        if (draggedItem && draggedItem[0] !== targetItem[0]) {
            // Rearrange the items
            if (draggedItem.index() < targetItem.index()) {
                targetItem.after(draggedItem); // Move dragged item after the target
            } else {
                targetItem.before(draggedItem); // Move dragged item before the target
            }

            // Update the numbering after each rearrangement
            Numbers();
                }
    });

    // Function to update the numbering of the tasks

    function Numbers() {
        $("#dragContainer-1 .inner-flex").each(function (index) {
            $(this).find(".num").text(index + 1); // Update the displayed number
        });
    }

    $('#submit-m3').click(function () {
        const elements = $('[data-value]'); // Select all elements with data-value
        const dataValueArray = elements.map((_, el) => parseInt($(el).data('value'))).get();

        // Check if the number of boxes is correct
        if (dataValueArray.length !== 4) {
            showCustomAlert("Please ensure to choose only the correct answer and remove any extra boxes.");
            return; // Exit the function if the condition is not met
        } else {
            // Check if the order is ascending
            const isAscending = dataValueArray.every((val, i, arr) => i === 0 || val > arr[i - 1]);
            const popupDialog = $("#popup");

            // Display the appropriate popup dialog
            if (isAscending) {
                popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m4" />');
            } else {
                popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
            }

            popupDialog.dialog("open");
        }
});
});

$(document).ready(function () {
    // Define the correct order for the tasks
    const correctOrder = ["Wake Up", "Brush Teeth", "Wear Outfit", "Have Breakfast"];

    // Enable drag-and-drop functionality
    $(".box1").attr("draggable", "true");

    let draggedItem = null;

    // When drag starts
    $(".box1").on("dragstart", function (e) {
        draggedItem = $(this).closest(".inner-flex"); // Store the parent container being dragged
        draggedItem.css("opacity", "0.5"); // Add visual feedback for dragging
        e.originalEvent.dataTransfer.effectAllowed = "move"; // Set the drag effect
    });

    // When drag ends
    $(".box1").on("dragend", function () {
        draggedItem.css("opacity", "1"); // Reset the visual feedback
        draggedItem = null; // Clear dragged item
    });

    // Allow drop on the inner-flex containers
    $(".inner-flex").on("dragover", function (e) {
        e.preventDefault(); // Allow the drop event to fire
        e.originalEvent.dataTransfer.dropEffect = "move"; // Set drop effect
    });

    // When an item is dropped
    $(".inner-flex").on("drop", function () {
        const targetItem = $(this); // The item being dropped onto

        // Avoid swapping the same item with itself
        if (draggedItem && draggedItem[0] !== targetItem[0]) {
            // Rearrange the items
            if (draggedItem.index() < targetItem.index()) {
                targetItem.after(draggedItem); // Move dragged item after the target
            } else {
                targetItem.before(draggedItem); // Move dragged item before the target
            }

            // Update the numbering after each rearrangement
            updateNumbersForM3();  
            Numbers();      }
    });

    // Function to update the numbering of the tasks
    

    

    $('#submit-m4').click(function () {
        const elements = $('[data-concept]'); // Use 'data-concept' instead of 'data-order'
        const dataConceptValues = elements.map((_, el) => parseInt($(el).data('concept'))).get();
        if (dataConceptValues.length !== 4) {
            showCustomAlert("Please ensure to choose only the correct answer and remove any extra boxes");
                    return; // Exit the function if the condition is not met
        } else{
            const isAscending = dataConceptValues.every((val, i, arr) => i === 0 || val > arr[i - 1]);
    
            const popupDialog = $("#popup");
        
            // Display the appropriate popup dialog
            if (isAscending) {
                popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m5" />');
            } else {
                popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
            }
        
            popupDialog.dialog("open");
        }
    });
});


function updateNumbersForM3() {
    console.log("Updating numbers for m3...");
    $("#dragContainer .inner-flex").each(function (index) {
        console.log(`Element ${index + 1}:`, $(this).html()); // Debugging output
        $(this).find(".num").text(index + 1); // Update the displayed number for m3
    });
}





document.querySelectorAll('.dropdown').forEach(select => {
    select.addEventListener('change', function () {
        if (this.value === "") {
            this.selectedIndex = 0; // Reset to the placeholder
        }
    });
});


// q5

$(document).ready(function () {
    let hasRunR5 = false; // Initialize the flag

    // Run button functionality
    $("#run-r5").click(function () {
        let output = "";

        // Loop through each line and process both static and dynamic code
        $(".q5 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val();
            const lineCode = $(this).find("p").text().trim();

            try {
                if (dropdownValue) {
                    // Handle dynamic dropdown selections
                    if (dropdownValue === "alert") {
                        const alertMessage = lineCode.match(/"(.*?)"/)[1];
                        alert(alertMessage); // Show dynamic alert
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = lineCode.match(/"(.*?)"/)[1];
                        const userInput = prompt(promptMessage, "Enter breakfast");
                    } else if (dropdownValue === "console.log") {
                        const consoleMessage = lineCode.match(/"(.*?)"/)[1];
                        console.log(consoleMessage); // Log to console
                        output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert line
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage); // Show static alert
                }
            } catch (e) {
                output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        });

        if (output) {
            $("#runmessages1").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages1").removeClass("styled-output").fadeOut();
        }

        hasRunR5 = true; // Set the flag to true after successful execution
        console.log("Run function executed, hasRunR5 set to true");
    });

    // Submit button functionality
    $('#submit-m5').click(function () {
        if (!hasRunR5) { // Check if the run function has been executed
            showCustomAlert("Please run the necessary function by clicking the 'Run' button first.");
            return; // Exit the function early
        }

        let isCorrect = true; // Assume correct until proven otherwise

        // Check each line for the correct answer
        $('.q5 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question

            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function

            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });

        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m6" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
        popupDialog.dialog("open"); // Open the dialog
    });
});


function showOutput1() {
    // Add the 'active' class to the Output button
    document.querySelector('#outputBtn1').classList.add('active');
    document.querySelector('#hintBtn1').classList.remove('active');

    // Clear previous output messages in #m5
    document.querySelector('#outputMessages1').innerHTML = ` `;

    // Change image for output in #m5
    document.querySelector('#outputBtn1 .outputbtn1').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn1 .outputbtn1').src = 'img/hint.svg'; // Reset hint image
}

function showHints1() {
    // Add the 'active' class to the Hint button
    document.querySelector('#hintBtn1').classList.add('active');
    document.querySelector('#outputBtn1').classList.remove('active');

    // Print the hints (messages) in #m5
    document.querySelector('#outputMessages1').innerHTML = `
        <p class="aligned-text">1. Wake Up!</p>
        <p class="aligned-text">2. Say "Brush Teeth"</p>
        <p class="aligned-text">3. Ask "Have your Breakfast?"</p>
    `;

    // Change image for hints in #m5
    document.querySelector('#hintBtn1 .outputbtn1').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn1 .outputbtn1').src = 'img/output1.svg'; // Reset output image
}


// Event listeners for both buttons
document.getElementById('outputBtn1').addEventListener('click', showOutput1);
document.getElementById('hintBtn1').addEventListener('click', showHints1);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput1();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {
    // Initialize jQuery UI Dialog
    $("#congrats-popup").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        closeOnEscape: true,
        open: function () {
            $(".ui-dialog-titlebar").hide();
        }
    });

    
    

});

// q6


function showOutput2() {
    // Add the 'active' class to the Output button
    document.getElementById('outputBtn2').classList.add('active');
    document.getElementById('hintBtn2').classList.remove('active');

    // Clear previous output messages
    document.getElementById('outputMessages2').innerHTML = ` `;

    // Change image for output
    document.querySelector('#outputBtn2 .outputbtn2').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn2 .outputbtn2').src = 'img/hint.svg'; // Reset hint image
}

function showHints2() {
    // Add the 'active' class to the Hint button
    document.getElementById('hintBtn2').classList.add('active');
    document.getElementById('outputBtn2').classList.remove('active');

    // Print the hints (messages)
    document.getElementById('outputMessages2').innerHTML = `
        <p class="aligned-text">1. Say "Wake Up at 8 AM." </p>
        <p class="aligned-text">2. Ask "Have you prepared breakfast?"</p>
        <p class="aligned-text">3. Ask "What activity will you do?"</p>
        <p class="aligned-text">4. Print "Lunch Time".</p>
    `;

    // Change image for hints
    document.querySelector('#hintBtn2 .outputbtn2').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn2 .outputbtn2').src = 'img/output1.svg'; // Reset output image
}

// Event listeners for both buttons
document.getElementById('outputBtn2').addEventListener('click', showOutput2);
document.getElementById('hintBtn2').addEventListener('click', showHints2);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput2();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {

    let hasRunR5 = false; // Initialize the flag
    // Handle the run button click
    $("#run-r6").click(function () {
        let output = "";

        // Loop through each line and process both static and dynamic code
        $(".q6 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val();
            const lineCode = $(this).find("p").text().trim();

            try {
                if (dropdownValue) {
                    // Handle dynamic dropdown selections
                    if (dropdownValue === "alert") {
                        const alertMessage = lineCode.match(/"(.*?)"/)[1];
                        alert(alertMessage); // Show dynamic alert
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = lineCode.match(/"(.*?)"/)[1];
                        const userInput = prompt(promptMessage, "Enter input");
                    } else if (dropdownValue === "console") {
                        const consoleMessage = lineCode.match(/"(.*?)"/)[1];
                        console.log(consoleMessage); // Log to console
                        output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert line
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage); // Show static alert
                } else if (/console\.log\("(.*?)"\);/.test(lineCode)) {
                    // Handle static console.log line
                    const consoleMessage = lineCode.match(/console\.log\("(.*?)"\);/)[1];
                    console.log(consoleMessage); // Log to console
                    output += `<span class="console-output">${consoleMessage}</span><br>`;
                } else if (/prompt\("([^"]*)"(?:,\s*"([^"]*)")?\);/.test(lineCode)) {
                    // Handle static prompt line
                    const match = lineCode.match(/prompt\("([^"]*)"(?:,\s*"([^"]*)")?\);/);
                    if (match) {
                        const promptMessage = match[1];
                        const defaultValue = match[2] || ""; // Default to an empty string if no defaultValue is provided
                        console.log("Prompt message:", promptMessage);
                        console.log("Default value:", defaultValue);
            
                        const userInput = prompt(promptMessage, defaultValue);
                        console.log(`User Input: ${userInput}`);
                    }
                }
            } catch (e) {
                output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        });

        // Display output with a new style class
        if (output) {
            $("#runmessages2").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages2").removeClass("styled-output").fadeOut();
        }
        hasRunR5 = true; // Set the flag to true after successful execution
        console.log("Run function executed, hasRunR5 set to true");
    });

    // Handle the submit button click
    $('#submit-m6').click(function () {
        if (!hasRunR5) { // Check if the run function has been executed
            showCustomAlert("Please run the necessary function by clicking the 'Run' button first.");
            return; // Exit the function early
        }

        let isCorrect = true; // Assume correct until proven otherwise

        // Check each line for the correct answer
        $('.q6 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question

            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function

            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });

        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m7" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
        popupDialog.dialog("open"); // Open the dialog
    });
    
    // Close output on click
    $("#runmessages").click(function () {
        $(this).fadeOut();
    });
});


//q7

function showOutput3() {
    // Add the 'active' class to the Output button
    document.getElementById('outputBtn3').classList.add('active');
    document.getElementById('hintBtn3').classList.remove('active');

    // Clear previous output messages
    document.getElementById('outputMessages3').innerHTML = ` `;

    // Change image for output
    document.querySelector('#outputBtn3 .outputbtn3').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn3 .outputbtn3').src = 'img/hint.svg'; // Reset hint image
}

function showHints3() {
    // Add the 'active' class to the Hint button
    document.getElementById('hintBtn3').classList.add('active');
    document.getElementById('outputBtn3').classList.remove('active');

    // Print the hints (messages)
    document.getElementById('outputMessages3').innerHTML = `
        <p class="aligned-text">1. Show "Get up early!"</p>
        <p class="aligned-text">2. Show "Have a glass of water!"</p>
        <p class="aligned-text">3. Ask "Do you exercise regularly?"</p>
        <p class="aligned-text">4. Print "Refresh yourself."</p>
        <p class="aligned-text">5. Print "Have a healthy morning meal."</p>
    `;

    // Change image for hints
    document.querySelector('#hintBtn3 .outputbtn3').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn3 .outputbtn3').src = 'img/output1.svg'; // Reset output image
}

// Event listeners for both buttons
document.getElementById('outputBtn3').addEventListener('click', showOutput3);
document.getElementById('hintBtn3').addEventListener('click', showHints3);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput3();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {
    let hasRunR5 = false; // Initialize the flag
    // Handle the run button click
    $("#run-r7").click(function () {
        let output = "";
    
        $(".q7 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val(); // Get dropdown value
            const lineCode = $(this).find("p").text().trim(); // Get static text
    
            try {
                if (dropdownValue) {
                    // Handle dropdown-based logic
                    if (dropdownValue === "alert") {
                        const alertMessage = $(this).find(".dropdown option:selected").text();
                        alert(alertMessage); // Show alert
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = $(this).find(".dropdown option:selected").text();
                        const userInput = prompt(promptMessage, "Enter input");
                        output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                    } else if (dropdownValue === "console") {
                        const consoleMessage = $(this).find(".dropdown option:selected").text();
                        console.log(consoleMessage); // Log to console
                        output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage);
                }else if (/prompt\("(.*?)"\);/.test(lineCode)) {
                    // Handle static prompt
                    const promptMessage = lineCode.match(/prompt\("(.*?)"\);/)[1];
                    const userInput = prompt(promptMessage, "Enter input");
                    // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                } 
                else if (/console\.log\("(.*?)"\);/.test(lineCode)) {
                    // Handle static console.log
                    const consoleMessage = lineCode.match(/console\.log\("(.*?)"\);/)[1];
                    console.log(consoleMessage);
                    output += `<span class="console-output">${consoleMessage}</span><br>`;
                }
            } catch (e) {
                output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        });
    
        // Display output
        if (output) {
            $("#runmessages3").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages3").removeClass("styled-output").fadeOut();
        }
        hasRunR5 = true; // Set the flag to true after successful execution
        console.log("Run function executed, hasRunR5 set to true");
    });
    

    // Handle the submit button click
    $('#submit-m7').click(function () {
        if (!hasRunR5) { // Check if the run function has been executed
            showCustomAlert("Please run the necessary function by clicking the 'Run' button first.");
            return; // Exit the function early
        }

        let isCorrect = true; // Assume correct until proven otherwise

        // Check each line for the correct answer
        $('.q7 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question

            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function

            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });

        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m8" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
        popupDialog.dialog("open"); // Open the dialog
    });
    
    // Close output on click
    $("#runmessages3").click(function () {
        $(this).fadeOut();
    });
});


$(document).ready(function () {
    // Attach click event to the .icon1 elements
    $('.icon2').on('click', function () {
        // Find the closest .line element and remove it
        $(this).closest('.line').remove();
    });
});


//q8


function showOutput4() {
    // Add the 'active' class to the Output button
    document.getElementById('outputBtn4').classList.add('active');
    document.getElementById('hintBtn4').classList.remove('active');

    // Clear previous output messages
    document.getElementById('outputMessages4').innerHTML = ` `;

    // Change image for output
    document.querySelector('#outputBtn4 .outputbtn4').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn4 .outputbtn4').src = 'img/hint.svg'; // Reset hint image
}

function showHints4() {
    // Add the 'active' class to the Hint button
    document.getElementById('hintBtn4').classList.add('active');
    document.getElementById('outputBtn4').classList.remove('active');

    // Print the hints (messages)
    document.getElementById('outputMessages4').innerHTML = `
        <p class="aligned-text">1. Show "Set alarm for tomorrow."</p>
        <p class="aligned-text">2. Print "Read a book."</p>
        <p class="aligned-text">3. Print "Turn off the bedroom light."</p>
        <p class="aligned-text">4. Print "Go to sleep."</p>
    `;

    // Change image for hints
    document.querySelector('#hintBtn4 .outputbtn4').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn4 .outputbtn4').src = 'img/output1.svg'; // Reset output image
}

// Event listeners for both buttons
document.getElementById('outputBtn4').addEventListener('click', showOutput4);
document.getElementById('hintBtn4').addEventListener('click', showHints4);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput4();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {
    let hasRunR5 = false; // Initialize the flag
    // Handle the run button click
    $("#run-r8").click(function () {
        let output = "";

        // Loop through each line and process both static and dynamic code
        $(".q8 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val(); // Get dropdown value
            const lineCode = $(this).find("p").text().trim(); // Get static text
    
            try {
                if (dropdownValue) {
                    // Handle dropdown-based logic
                    if (dropdownValue === "alert") {
                        const alertMessage = $(this).find(".dropdown option:selected").text();
                        alert(alertMessage); // Show alert
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = $(this).find(".dropdown option:selected").text();
                        const userInput = prompt(promptMessage, "Enter input");
                        output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                    } else if (dropdownValue === "console") {
                        const consoleMessage = $(this).find(".dropdown option:selected").text();
                        console.log(consoleMessage); // Log to console
                        output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage);
                }else if (/prompt\("(.*?)"\);/.test(lineCode)) {
                    // Handle static prompt
                    const promptMessage = lineCode.match(/prompt\("(.*?)"\);/)[1];
                    const userInput = prompt(promptMessage, "Enter input");
                    // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                } 
                else if (/console\.log\("(.*?)"\);/.test(lineCode)) {
                    // Handle static console.log
                    const consoleMessage = lineCode.match(/console\.log\("(.*?)"\);/)[1];
                    console.log(consoleMessage);
                    output += `<span class="console-output">${consoleMessage}</span><br>`;
                }
            } catch (e) {
                output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        });

        // Display output with a new style class
        if (output) {
            $("#runmessages4").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages4").removeClass("styled-output").fadeOut();
        }
        hasRunR5 = true; // Set the flag to true after successful execution
        console.log("Run function executed, hasRunR5 set to true");
    });

    // Handle the submit button click
    $('#submit-m8').click(function () {
        if (!hasRunR5) { // Check if the run function has been executed
            showCustomAlert("Please run the necessary function by clicking the 'Run' button first.");
            return; // Exit the function early
        }

        let isCorrect = true; // Assume correct until proven otherwise

        // Check each line for the correct answer
        $('.q8 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question

            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function

            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });

        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m9" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
        popupDialog.dialog("open"); // Open the dialog
    });
    
    // Close output on click
    $("#runmessages4").click(function () {
        $(this).fadeOut();
    });
});


// q9

function showOutput5() {
    // Add the 'active' class to the Output button
    document.getElementById('outputBtn5').classList.add('active');
    document.getElementById('hintBtn5').classList.remove('active');

    // Clear previous output messages
    document.getElementById('outputMessages5').innerHTML = ` `;

    // Change image for output
    document.querySelector('#outputBtn5 .outputbtn5').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn5 .outputbtn5').src = 'img/hint.svg'; // Reset hint image
}

function showHints5() {
    // Add the 'active' class to the Hint button
    document.getElementById('hintBtn5').classList.add('active');
    document.getElementById('outputBtn5').classList.remove('active');

    // Print the hints (messages)
    document.getElementById('outputMessages5').innerHTML = `
        <p class="aligned-text">1. Show "Sit down!"</p>
        <p class="aligned-text">2. Show "Have tea or coffee!"</p>
        <p class="aligned-text">3. Ask "What snack will you take?" and enter the snack.</p>
        <p class="aligned-text">4. Print"Take a short walk."</p>
        <p class="aligned-text">5. Print "Spend time with family."</p>
    `;

    // Change image for hints
    document.querySelector('#hintBtn5 .outputbtn5').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn5 .outputbtn5').src = 'img/output1.svg'; // Reset output image
}

// Event listeners for both buttons
document.getElementById('outputBtn5').addEventListener('click', showOutput5);
document.getElementById('hintBtn5').addEventListener('click', showHints5);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput5();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {
    let hasRunR5 = false; // Initialize the flag

    // Handle the run button click
    $("#run-r9").click(function () {
        let output = "";

        // Loop through each line and process both static and dynamic code
        $(".q9 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val();
            const lineCode = $(this).find("p").text().trim();

            try {
                if (dropdownValue) {
                    // Handle dynamic dropdown selections
                    if (dropdownValue === "alert") {
                        const alertMessage = lineCode.match(/"(.*?)"/)[1];
                        alert(alertMessage); // Show dynamic alert
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = lineCode.match(/"(.*?)"/)[1];
                        const userInput = prompt(promptMessage, "Enter activity here");
                        // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                    } else if (dropdownValue === "console") {
                        const consoleMessage = lineCode.match(/"(.*?)"/)[1];
                        console.log(consoleMessage); // Log to console
                        // output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage);
                }else if (/prompt\("(.*?)"\);/.test(lineCode)) {
                    // Handle static prompt
                    const promptMessage = lineCode.match(/prompt\("(.*?)"\);/)[1];
                    const userInput = prompt(promptMessage, "Enter input");
                    // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                } 
                else if (/console\.log\("(.*?)"\);/.test(lineCode)) {
                    // Handle static console.log
                    const consoleMessage = lineCode.match(/console\.log\("(.*?)"\);/)[1];
                    console.log(consoleMessage);
                    output += `<span class="console-output">${consoleMessage}</span><br>`;
                }

            } catch (e) {
                // output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        });

        // Display output with a new style class
        if (output) {
            $("#runmessages5").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages5").removeClass("styled-output").fadeOut();
        }
        hasRunR5 = true; // Set the flag to true after successful execution
        console.log("Run function executed, hasRunR5 set to true");
    });

    // Handle the submit button click
    $('#submit-m9').click(function () {
        if (!hasRunR5) { // Check if the run function has been executed
            showCustomAlert("Please run the necessary function by clicking the 'Run' button first.");
            return; // Exit the function early
        }

        let isCorrect = true; // Assume correct until proven otherwise

        // Check each line for the correct answer
        $('.q9 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question

            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function

            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });

        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image" data-navigate="m10" />');
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
        }
        popupDialog.dialog("open"); // Open the dialog
    });
    
    // Close output on click
    $("#runmessages5").click(function () {
        $(this).fadeOut();
    });
});


// q10

function showOutput6() {
    // Add the 'active' class to the Output button
    document.getElementById('outputBtn6').classList.add('active');
    document.getElementById('hintBtn6').classList.remove('active');

    // Clear previous output messages
    document.getElementById('outputMessages6').innerHTML = ` `;

    // Change image for output
    document.querySelector('#outputBtn6 .outputbtn6').src = 'img/output.svg'; // Change to output image path
    document.querySelector('#hintBtn6 .outputbtn6').src = 'img/hint.svg'; // Reset hint image
}

function showHints6() {
    // Add the 'active' class to the Hint button
    document.getElementById('hintBtn6').classList.add('active');
    document.getElementById('outputBtn6').classList.remove('active');

    // Print the hints (messages)
    document.getElementById('outputMessages6').innerHTML = `
        <p class="aligned-text">1. Show "Have lunch."</p>
        <p class="aligned-text">2. Show "Take a rest."</p>
        <p class="aligned-text">3. Ask "What time will you start your homework?" to enter the time.</p>
        <p class="aligned-text">4. Ask "What hobby would you like to work on?" to enter the hobby.</p>
        <p class="aligned-text">5. Print "Go to the park."</p>
        <p class="aligned-text">6. Print "Play with friends."</p>
    `;

    // Change image for hints
    document.querySelector('#hintBtn6 .outputbtn6').src = 'img/hint1.svg'; // Change to hint image path
    document.querySelector('#outputBtn6 .outputbtn6').src = 'img/output1.svg'; // Reset output image
}

// Event listeners for both buttons
document.getElementById('outputBtn6').addEventListener('click', showOutput6);
document.getElementById('hintBtn6').addEventListener('click', showHints6);

// Default behavior: Ensure the Output button is active by default
window.onload = function() {
    showOutput6();  // Set Output as the active button on page load
}

// jQuery to handle dropdown behavior
$(document).ready(function () {
    // Initially hide the first option when the dropdown is visible
    $(".dropdown").find("option[function='']").hide();

    // When the user interacts with the dropdown
    $(".dropdown").change(function () {
        // If a valid option is selected, hide the first option
        if ($(this).val() !== "") {
            $(this).find("option[function='']").hide();
        }
    });

    // If the dropdown is reset, show the first option again
    $(".dropdown").focus(function () {
        if ($(this).val() === "") {
            $(this).find("option[function='']").show();
        }
    });
});

$(document).ready(function () {
    // Handle the run button click
    $("#run-r10").click(function () {
        let output = "";

        // Loop through each line and process both static and dynamic code
        $(".q10 .code-block .line").each(function () {
            const dropdownValue = $(this).find(".dropdown").val();
            const lineCode = $(this).find("p").text().trim(); // Get the static code inside <p>

            try {
                if (dropdownValue) {
                    // Handle dropdown selections
                    if (dropdownValue === "alert") {
                        const alertMessage = "Get up early!";
                        alert(alertMessage); // Show alert box
                    } else if (dropdownValue === "prompt") {
                        const promptMessage = "What time will you start your homework?";
                        const userInput = prompt(promptMessage, "Enter time"); // Show prompt box
                        if (userInput !== null) {
                            // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                        }
                    } else if (dropdownValue === "console") {
                        // const consoleMessage = "Sleep in";
                        console.log(consoleMessage); // Log to the browser console
                        output += `<span class="console-output">${consoleMessage}</span><br>`;
                    }
                } else if (/alert\("(.*?)"\);/.test(lineCode)) {
                    // Handle static alert
                    const alertMessage = lineCode.match(/alert\("(.*?)"\);/)[1];
                    alert(alertMessage);
                }else if (/prompt\("(.*?)"\);/.test(lineCode)) {
                    // Handle static prompt
                    const promptMessage = lineCode.match(/prompt\("(.*?)"\);/)[1];
                    const userInput = prompt(promptMessage, "Enter hobby");
                    // output += `<span class="console-output">User Input: ${userInput}</span><br>`;
                } 
                else if (/console\.log\("(.*?)"\);/.test(lineCode)) {
                    // Handle static console.log
                    const consoleMessage = lineCode.match(/console\.log\("(.*?)"\);/)[1];
                    console.log(consoleMessage);
                    output += `<span class="console-output">${consoleMessage}</span><br>`;
                }
            } catch (e) {
                // output += `<span class="error">Error: ${e.message}</span><br>`;
            }
        

        // Display the output
        if (output) {
            $("#runmessages6").html(output).fadeIn().addClass("styled-output");
        } else {
            $("#runmessages6").removeClass("styled-output").fadeOut();
        }
    });
});



    // Handle the submit button click
    $('#submit-m10').click(function () {
        let isCorrect = true; // Assume correct until proven otherwise
    
        // Check each line for the correct answer
        $('.q10 .line').each(function () {
            const selectedValue = $(this).find('.dropdown').val(); // Get the selected value
            const sequence = parseInt($(this).data('sequence')); // Get the data-sequence of the question
    
            // Find the expected value based on the sequence
            const expectedValue = $(this).find(`option[data-function="${sequence}"]`).val(); // Get expected value based on data-function
    
            // Check if the selected value matches the expected value
            if (selectedValue !== expectedValue) {
                isCorrect = false; // If any answer is incorrect, mark as false
            }
        });
    
        // Show result in dialog
        const popupDialog = $("#popup");
        if (isCorrect) {
            popupDialog.html('<img src="img/correct.png" class="result-image correct-image" />');
            popupDialog.dialog("open"); // Open the dialog to show the correct image
    
            // Use setTimeout to delay showing the custom alert
            // Delay in milliseconds (1000 ms = 1 second)
        } else {
            popupDialog.html('<img src="img/wrong.png" class="result-image" data-navigate="retry" />');
            popupDialog.dialog("open"); // Open the dialog for incorrect answer
        }
    });
    
    
    
    // Close output on click
    $("#runmessages").click(function () {
        $(this).fadeOut();
    });
});
