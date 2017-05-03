var Puzzle = React.createClass({

    getInitialState: function() {
        var arr = [
            [
                [1, false],
                [2, false],
                [3, false]
            ],
            [
                [4, false],
                [5, false],
                [6, true]
            ],
            [
                [7, false],
                [8, true],
                [0, false]
            ]
        ];
        var solvable = false;
        while(!solvable) {
            // create array with unique numbers in a random order
            var a = ['0','1','2','3','4','5','6','7','8'];
            for (var j, x, i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }

            // fill puzzle with new random order
            var blank;
            for (var count = 0, i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    arr[i][j][0] = a[count];
                    if(arr[i][j][0] == 0) {
                        blank = count;
                    }
                    arr[i][j][1] = false;
                    count++;
                }
            }

            // mark spots next to the 'blank' piece
            if(parseInt(blank/3) == 0) {
                arr[parseInt(blank/3)+1][blank%3][1] = true;
            }
            else if(parseInt(blank/3) == 1) {
                arr[parseInt(blank/3)+1][blank%3][1] = true;
                arr[parseInt(blank/3)-1][blank%3][1] = true;
            }
            else if(parseInt(blank/3) == 2) {
                arr[parseInt(blank/3)-1][blank%3][1] = true;
            }

            if(blank%3 == 0) {
                arr[parseInt(blank/3)][(blank%3)+1][1] = true;
            }
            else if(blank%3 == 1) {
                arr[parseInt(blank/3)][(blank%3)+1][1] = true;
                arr[parseInt(blank/3)][(blank%3)-1][1] = true;
            }
            else if(blank%3 == 2) {
                arr[parseInt(blank/3)][(blank%3)-1][1] = true;
            }

            // checks to make sure the new puzzle is solvable
            var inversions = 0;
            for(var i = 0; i < 8; i++) {
                for(var j = i + 1; j < 9; j++) {
                    if(a[i] > a[j] && a[i] != 0 && a[j] != 0) {
                        inversions++;
                    }
                }
            }

            // if new puzzle isn't solvable then scramble again
            if(inversions%2 == 0) {
                solvable = true;;
            }
        }
        return {
            puzzleArray: arr
        }
    },

    switchPieces: function(number, i) {
        var arr = this.state.puzzleArray;
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                if(arr[j][k][0] == 0) {
                    arr[j][k][0] = number;
                }
                arr[j][k][1] = false;
            }
        } 
        arr[parseInt(i/3)][i%3][0] = 0;

        if(parseInt(i/3) == 0) {
            arr[parseInt(i/3)+1][i%3][1] = true;
        }
        else if(parseInt(i/3) == 1) {
            arr[parseInt(i/3)+1][i%3][1] = true;
            arr[parseInt(i/3)-1][i%3][1] = true;
        }
        else if(parseInt(i/3) == 2) {
            arr[parseInt(i/3)-1][i%3][1] = true;
        }

        if(i%3 == 0) {
            arr[parseInt(i/3)][(i%3)+1][1] = true;
        }
        else if(i%3 == 1) {
            arr[parseInt(i/3)][(i%3)+1][1] = true;
            arr[parseInt(i/3)][(i%3)-1][1] = true;
        }
        else if(i%3 == 2) {
            arr[parseInt(i/3)][(i%3)-1][1] = true;
        }

        
        this.setState({puzzleArray: arr});
    },

    scramblePieces: function() {
        var arr = this.state.puzzleArray;

        // create array with unique numbers in a random order
        var a = ['0','1','2','3','4','5','6','7','8'];
        for (var j, x, i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        // fill puzzle with new random order
        var blank;
        for (var count = 0, i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                arr[i][j][0] = a[count];
                if(arr[i][j][0] == 0) {
                    blank = count;
                }
                arr[i][j][1] = false;
                count++;
            }
        }

        // mark spots next to the 'blank' piece
        if(parseInt(blank/3) == 0) {
            arr[parseInt(blank/3)+1][blank%3][1] = true;
        }
        else if(parseInt(blank/3) == 1) {
            arr[parseInt(blank/3)+1][blank%3][1] = true;
            arr[parseInt(blank/3)-1][blank%3][1] = true;
        }
        else if(parseInt(blank/3) == 2) {
            arr[parseInt(blank/3)-1][blank%3][1] = true;
        }

        if(blank%3 == 0) {
            arr[parseInt(blank/3)][(blank%3)+1][1] = true;
        }
        else if(blank%3 == 1) {
            arr[parseInt(blank/3)][(blank%3)+1][1] = true;
            arr[parseInt(blank/3)][(blank%3)-1][1] = true;
        }
        else if(blank%3 == 2) {
            arr[parseInt(blank/3)][(blank%3)-1][1] = true;
        }

        // checks to make sure the new puzzle is solvable
        var inversions = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = i + 1; j < 9; j++) {
                if(a[i] > a[j] && a[i] != 0 && a[j] != 0) {
                    inversions++;
                }
            }
        }

        // if new puzzle isn't solvable then scramble again
        if(inversions%2 == 0) {
            this.setState({puzzleArray: arr});
        }
        else {
            this.scramblePieces();
        }

    },

    checkSolved: function() {
        var arr = this.state.puzzleArray;
        var solved = true;
        if(arr[0][0][0] != 1) { solved = false; }
        if(arr[0][1][0] != 2) { solved = false; }
        if(arr[0][2][0] != 3) { solved = false; }
        if(arr[1][0][0] != 4) { solved = false; }
        if(arr[1][1][0] != 5) { solved = false; }
        if(arr[1][2][0] != 6) { solved = false; }
        if(arr[2][0][0] != 7) { solved = false; }
        if(arr[2][1][0] != 8) { solved = false; }
        if(arr[2][2][0] != 0) { solved = false; }
        return(solved);
    },

    eachPiece: function(piece, i) {
        return (
            <div>
            <PuzzlePiece
                number={piece[0][0]}
                moveable={piece[0][1]}
                switchPieces={this.switchPieces}
                key={3*i}
                index={3*i}
            />
            <PuzzlePiece
                number={piece[1][0]}
                moveable={piece[1][1]}
                switchPieces={this.switchPieces}
                key={3*i+1}
                index={3*i+1}
            />
            <PuzzlePiece
                number={piece[2][0]}
                moveable={piece[2][1]}
                switchPieces={this.switchPieces}
                key={3*i+2}
                index={3*i+2}
            />
            </div>
        );
    },

	render: function () {
		return (
		    <div>
		        <ScrambleButton
                    scramblePieces={this.scramblePieces}
                />
                {this.state.puzzleArray.map(this.eachPiece)}
                <SolvedText
                    checkSolved={this.checkSolved}
                />
            </div>
		);
	}
});

var PuzzlePiece = React.createClass({

    submit: function() {
        this.props.switchPieces(this.props.number, this.props.index);
    },

    renderMoveable: function () {
        if(this.props.index%3 == 2){
            return (
                <div>
                    <button onClick={this.submit} id="piece-moveable-clear">{this.props.number}</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <button onClick={this.submit} id="piece-moveable">{this.props.number}</button>
                </div>
            );
        }
    },

    renderBlank: function () {
        if(this.props.index%3 == 2){
            return (
                <div>
                    <button id="piece-blank-clear"></button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <button id="piece-blank"></button>
                </div>
            );
        }
    },

    renderPlain: function () {
        if(this.props.index%3 == 2){
            return (
                <div>
                    <button id="piece-plain-clear">{this.props.number}</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <button id="piece-plain">{this.props.number}</button>
                </div>
            );
        }
    },

    render: function () {
        if(this.props.moveable){
            return this.renderMoveable();
        }
        else if(this.props.number == 0){
            return this.renderBlank();
        }
        else {
            return this.renderPlain();
        }
    }
});

var ScrambleButton = React.createClass({

    scramble: function() {
        this.props.scramblePieces();
    },

    render: function () {
        return (
            <div>
                <button onClick={this.scramble}>Scramble</button>
            </div>
        );
    }
});

var SolvedText = React.createClass({

    render: function () {
        if(this.props.checkSolved()) {
            return (
                <div>
                    <h1>You Win!</h1>
                </div>
            );
        }
        else {
            return (
                <div>
                </div>
            );
        }
    }
});
