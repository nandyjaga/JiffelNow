(function() {
    'use strict';

    angular
        .module('assignment')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http) {
        var vm = this;
        vm.methods = {};
        vm.model = {
            showResults: false,
            questions: [],
            pageError: null,
            question: null,
            answerTextMap: {
                "0": "A", // MAP to show the A B C D options on UI
                "1": "B",
                "2": "C",
                "3": "D"
            }
        };


        //Ajax to get list of questions from the service.
        vm.methods.getQuestions = function() {
            var questionsURL = "//cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json"
            $http.get(questionsURL).then(function(res) {
                vm.model.questions = res.data;
                vm.methods.upDateQuestionModel();
            }, function() {
				vm.model.pageError = "Unable to access the services. Please try later.";
            });
        }

        //Method to manipulate the response to add additional key selected answer.
        vm.methods.upDateQuestionModel = function() {
            vm.model.questions = vm.model.questions.map(function(question) {
                question.selectedAns = null;
                return question;
            });
            vm.model.question = vm.model.questions.length > 0 ? 0 : null;
        }

        //Method to set the selected answer
        vm.methods.setSelected = function(index) {
            vm.model.questions[vm.model.question].selectedAns = index;
        }

        //Method to navigate to next question
        vm.methods.nextQuestion = function() {
            vm.model.question++;
        }

        //Method to show the grid report
        vm.methods.ShowResults = function() {
            vm.model.showResults = true;
        }

        // Method to get the total count of correct answers
        vm.methods.getCorrectAnswers = function() {
            var result = vm.model.questions.filter(function(question) {
                return question.answer === question.selectedAns;
            }).length + "/" + vm.model.questions.length;
            return result;
        }

        //Method to calculate the percentage 
        vm.methods.getPercentage = function() {
                var result = (vm.model.questions.filter(function(question) {
                    return question.answer === question.selectedAns;
                }).length * 100) / vm.model.questions.length;
                return Math.ceil(result);
            }
            // Initiate ajax for questions
        vm.methods.getQuestions();

    }
})();