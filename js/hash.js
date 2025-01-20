/*
 * Hash  v0.7.3
 * Copyright 2023 HashHackCode, LLP.
 */
(function($) {
    function Hash(config) {
        this.config = config;
        this.clickedDotsSequence = []; 
        this.initialStates = {};
        this.init();
    }
    
    Hash.prototype.init = function() {
        var _this = this;
        var lastClickedRef = null;
        var lastClickedRefTileClass = null;
        var lastClickedRefTileColorClass = null;
        var lastClickedRefOptionClass = null;
        var lastDotIndex = 0;
    
    
        $(document).ready(function($) {
            //BG JS
            if ($('.pageGrid').hasClass('bg')) {
                var bgImage = $('.question.active').data('bg');
                $('.pageGrid.bg').css({
                    'background-image': 'url(' + bgImage + ')',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
                });
        
                $('.question').on('classChanged', function() {
                    var bgImage = $('.question.active').data('bg');
                    $('.pageGrid.bg').css({
                        'background-image': 'url(' + bgImage + ')',
                        'background-repeat': 'no-repeat',
                        'background-size': 'cover'
                    });
                });
            }
            //End of BG JS
        // Initialize worksheet results object
        // TO DO - auto assign the worksheet id from post
        $('section.worksheet').each(function() {
            var totalQuestions = $(this).find('.question').length;
        
            // Hide all questions initially and show only the first one
            $(this).find('.question').each(function() {
                var questionClass = $(this).attr('class').split(' ').find(c => c.startsWith('q'));
                _this.initialStates[questionClass] = $(this).html(); // Store initial HTML for resetting questions
                $(this).hide(); // Hide all questions initially
            });
            var $firstQuestion = $(this).find('.question').first();
            $firstQuestion.show(); // Show only the first question
            $firstQuestion.addClass('active'); // Mark the first question as active
    
            _this.updateQuestionDisplay($firstQuestion, totalQuestions, false); // Update the question display after marking the first question as active
        
        });
        
    
        function getClassStartingWith(element, prefix) {
            return $(element).attr('class').split(' ').find(c => c.startsWith(prefix));
        }
        //JS Change 
        
        $('section.worksheet').on('click', '.ans-select, .ans-image, .ans-fill, .ans-ref, .ans-multi, .ans-music', function() {
            if ($(this).hasClass('ans-multi') || $(this).hasClass('ans-music')) {
                $(this).toggleClass('selected');
            } else {
                $(this).siblings().removeClass('selected').end().addClass('selected');
            }
        });
        // End of JS Change 1
        $('section.worksheet').on('click', '.ans-ref', function() {
            var questionType = $(this).closest('.question').data('question');
        
            switch (questionType) {
        
                case 'tiles':
                    lastClickedRef = $(this);
                    lastClickedRefTileClass = getClassStartingWith(this, 'tile-');
                    lastClickedRefTileColorClass = getClassStartingWith(this, 'tileColor-');                    
                    break;
        
                
            }
        });
        
        
        $('section.worksheet').on('click', '.ans-tiles', function(event) {
            event.stopPropagation();
            var currentTileClass = getClassStartingWith(this, 'tile-');
            var currentTileColorClass = getClassStartingWith(this, 'tileColor-');
        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected').removeClass(currentTileClass).removeClass(currentTileColorClass);
                $('.ans-ref.' + currentTileClass).show();
            } else if (lastClickedRef) {
                $('.ans-tiles.selected.' + lastClickedRefTileClass).removeClass('selected').removeClass(lastClickedRefTileClass).removeClass(lastClickedRefTileColorClass);
                $(this).addClass(lastClickedRefTileClass).addClass(lastClickedRefTileColorClass).addClass('selected');
                lastClickedRef.hide();
                lastClickedRef = null;
                lastClickedRefTileClass = null;
                lastClickedRefTileColorClass = null;
            }
        });

       
        
    
        
    
        // JS Change 2

    
        $('#reset').click(function() {
            var $activeQuestion = $('.question.active'); // Get the active question
            _this.resetQuestion($activeQuestion);
        });
            $('#submit').click(function() {
                _this.checkAnswers();
            });
        });
    };
    
    Hash.prototype.checkQuestion = function($question) {
        var questionType = $question.data('question');
        var isCorrect = false;   
        var allMatchesCorrect = true;
        var totalMatches = 0;
        var correctMatchAnswers = 0;
        console.log("Question Type: ", questionType);
        // Declare correctAnswer variable
        var correctAnswer = ''; // Default value
    
        if (questionType !== 'match') {
            correctAnswer = $question.find('.answer').data('answer') ? $question.find('.answer').data('answer').toString().toLowerCase() : "";
        }
        console.log("Correct Answer: ", correctAnswer);
        switch (questionType) {
                case 'select':
                case 'image':
                    var userAnswer = $question.find('.selected').text().toLowerCase().trim() || $question.find('.selected').attr('alt');
                    isCorrect = userAnswer === correctAnswer;
                    break;
            
                // case 'fill':
                //     userAnswer = $question.find('.ans-fill').text().toLowerCase().trim();
                //     isCorrect = userAnswer === correctAnswer;
                //     break;
           
                case 'fill':
        console.log("Fill");
    
        var allAnswersCorrect = true; // Flag to track if all answers are correct
        var anyIncorrectAnswer = false; // Flag to track if any answer is incorrect
    
        // Iterate over each .answer element within the $question
        $question.find('.answer').each(function() {
            var userAnswer = $(this).find('.ans-fill').text().toLowerCase().replace(/[\s\uFEFF\xA0]+/g, '');
            userAnswer = userAnswer === "" ? null : userAnswer;
    
            var correctAnswer = $(this).data('answer').toString();
            console.log("User Answer: ", userAnswer);
            console.log("Correct Answer: ", correctAnswer);
    
            if (userAnswer !== correctAnswer) {
                anyIncorrectAnswer = true;
                $(this).find('.ans-fill').addClass('incorrect'); // Mark incorrect ans-fill
            } else {
                $(this).find('.ans-fill').addClass('correct'); // Mark correct ans-fill
            }
        });
    
        // All answers are correct if there are no incorrect answers
        allAnswersCorrect = !anyIncorrectAnswer;
    
        isCorrect = allAnswersCorrect;
    
        console.log("Is Correct: ", isCorrect);
        break;
     
    
           
    
                        
   
                        case 'tiles':
                            var allTilesCorrect = true;
                            var totalTiles = $('.ans-ref', $question).length;
                            var selectedTiles = $('.ans-tiles.selected', $question).length;
                        
                            if (totalTiles !== selectedTiles) {
                                allTilesCorrect = false;
                                console.log("Not all tiles are selected");
                            }
                            $('.ans-tiles.selected', $question).each(function() {
                                console.log("Tiles");
                                var classList = $(this).attr('class').split(' ');
                                var tileClass = classList.find(c => c.startsWith('tile-'));
                                if (tileClass) {
                                    var tileData = $(this).data('tiles');
                                    var correspondingRef = $('.ans-ref.' + tileClass, $question);
                                    var refData = correspondingRef.data('tiles');
                                    if (tileData) { // Check if tileData is not undefined
                                        tileData = tileData.split(','); // Split the data into an array
                                        console.log("Tile Data: ", tileData);
                                        console.log("Ref Data: ", refData);
                                        if (!tileData.includes(refData)) { // Check if the selected option is in the list of correct options
                                            allTilesCorrect = false;
                                            console.log("All Tiles incorrect: ", allTilesCorrect);
                                            $(this).addClass('incorrect'); // Mark incorrect ans-tiles
                                            correspondingRef.addClass('incorrect'); // Mark corresponding ans-ref as incorrect
                                        } else {
                                            $(this).addClass('correct'); // Mark correct ans-tiles
                                            correspondingRef.addClass('correct'); // Mark corresponding ans-ref as correct
                                        }
                                    } else { // If tileData is undefined, mark the tile as incorrect
                                        allTilesCorrect = false;
                                        console.log("All Tiles incorrect: ", allTilesCorrect);
                                        $(this).addClass('incorrect'); // Mark incorrect ans-tiles
                                        correspondingRef.addClass('incorrect'); // Mark corresponding ans-ref as incorrect
                                    }
                                }
                            }); 
                            isCorrect = allTilesCorrect;
                            console.log("All Tiles Correct 2: ", isCorrect);
                            break;
    

                        
                    default:
                        // Handle unknown question types or do nothing
                        break;
        }
    
        return {
            isCorrect: isCorrect,
            correctAnswer: correctAnswer,
            totalMatches: totalMatches,
            correctMatchAnswers: correctMatchAnswers
        };
    };
    
    // Initialize popup
    $("#congrats-popup").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        closeOnEscape: true,
        dialogClass: "custom-overlay", // Add a custom class to the dialog
        open: function() {
            // Remove the title bar
            $(".ui-dialog-titlebar").hide();
    
            // Make the dialog fullscreen
            $(this).parent().css({
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            });
    
            // Make the content fullscreen
            $(this).css({
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            });
        }
    }).click(function() {
        $(this).dialog("close");
    });
    
    function updateDatabaseForQuestion() {
        // $.ajax({
        //     url: myAjax.ajaxurl,
        //     type: 'POST',
        //     data: {
        //         action: 'handle_question',
        //         questionId: currentQuestionId,
        //         questionResult: currentQuestionResult
        //     },
        //     success: function(response) {
        //         console.log('Database updated successfully for question', response);
        //     },
        //     error: function(error) {
        //         console.error('Error updating database for question', error);
        //     }
        // });
    }
    
    function QuestionCompleted() {
        $.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'handle_last_question',
            },
            success: function(response) {
                console.log('Database updated successfully for last question', response);
            },
            error: function(error) {
                console.error('Error updating database for last question', error);
            }
        });
    }
    Hash.prototype.checkAnswers = function() {
        var _this = this;
    
        $('section.worksheet').each(function() {
            var totalQuestions = $(this).find('.question').length;
            var allQuestions = $(this).find('.question');
    
            var $currentQuestion = allQuestions.filter('.active');
            var $nextQuestion = $currentQuestion.next('.question'); 
            var result = _this.checkQuestion($currentQuestion);
            var isCorrect = result.isCorrect; // Extract the isCorrect value from the object
    
            if (isCorrect) {
                $currentQuestion.addClass('correct').removeClass('incorrect');
                $("#congrats-popup").html('<img src="img/correct.png" class="result-image" />'); // Set the content of the dialog box to the correct image
                $("#congrats-popup").dialog({
                    close: function() {
                        if ($nextQuestion.length) { 
                            _this.updateQuestionDisplay($currentQuestion, totalQuestions, true);
                            _this.moveToNextQuestion($currentQuestion); // Move this line here
                            updateDatabaseForQuestion(); // Case 1: Update the database for a question
                        } else {
                            QuestionCompleted(); // Case 2: Update the database for the last question
                            $('.popup').css('display', 'block');
                            console.log("Worksheet completed");
                        }
                    }
                }).dialog("open");
            } else {
                $currentQuestion.addClass('incorrect').removeClass('correct');
                $("#congrats-popup").html('<img src="img/wrong.png" class="result-image" />'); // Set the content of the dialog box to the incorrect image
                $("#congrats-popup").dialog("open");
            }
        });
    
        function QuestionCompleted() {
            // Show completion text or perform any other action
            // alert('Congratulations! You have completed all the questions.');
            // jQuery to show the custom alert box
            $('#custom-alert').show();
    
            // jQuery to hide the custom alert box
            $('#close-alert').on('click', function() {
                $('#custom-alert').hide();
            });
        }
    };
    Hash.prototype.resetQuestion = function($question) {
        var activeQuestionClass = $question.attr('class').split(' ').find(c => c.startsWith('q'));
        if (activeQuestionClass && this.initialStates[activeQuestionClass]) { // Make sure activeQuestionClass and this.initialStates[activeQuestionClass] are defined
            $question.removeClass('correct incorrect');
            $question.html(this.initialStates[activeQuestionClass]); // Use this.initialStates here
    
           
        }
    };
    //JS Change 3
    Hash.prototype.moveToNextQuestion = function($currentQuestion) {
        $currentQuestion.removeClass('active').trigger('classChanged').hide();
        var $nextQuestion = $currentQuestion.next('.question');
        if ($nextQuestion.length) {
            $nextQuestion.addClass('active').trigger('classChanged').show();
            
            if ($currentQuestion.data('question') === 'match' || $currentQuestion.data('question')=== 'dots') {
            // Get the SVG and polyline
            var svg = document.querySelector('svg');
            var polyline = document.querySelector('polyline');
    
            // Remove all circles from the SVG
            var circles = svg.querySelectorAll('circle');
            circles.forEach(function(circle) {
                svg.removeChild(circle);
            });
            // Remove all lines from the SVG
            var lines = svg.querySelectorAll('line');
            lines.forEach(function(line) {
                svg.removeChild(line);
            });
            // Clear the points from the polyline
            polyline.setAttribute("points", "");
            }
            $currentQuestion.find('.ans-match, .ans-dots').each(function() {
                var $this = $(this);
                $this.removeData('circle').removeData('line').removeData('pair');
                $this.removeClass(function(index, className) {
                    return (className.match(/(^|\s)dot-\S+/g) || []).join(' ');
                });
            });
        } 
    };
    //End of JS Change 3
    Hash.prototype.updateQuestionDisplay = function($currentQuestion, totalQuestions, isNextQuestion) {
        var currentQuestionIndex = $currentQuestion.parent().children().index($currentQuestion);
    
        console.log("current Questions: ", currentQuestionIndex);
        // Update question count display
        // $('#h1 .n0-i1 p').text(`${currentQuestionIndex + 1 + (isNextQuestion ? 1 : 0)} / ${totalQuestions}`);
    };
        // Make Hash globally accessible
        window.Hash = Hash;
    })(jQuery);

