'use strict';
var the_console = new class {
  run (title, literals, code) {
    var the_console = document.getElementById('console');
    the_console.innerHTML = '';
    var read = this.read;
    var write = this.write;
		// eval cannot look this
		window.__io = {
			text: undefined,
			last_text: undefined,
			show: true
		}
    /* non-existent code for name of algorithm */
    the_console.innerHTML += '<div class="lines"><div class="CodeMirror-linenumber ' +
      'CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> ' +
      'algorithm run ' + title + '.js</div></div>';
    console.log(literals + code);
		// show console before of prompt
		setTimeout(() => {
			try {
			  eval(literals + code);
			}
			catch(e) {
				write(e.message);
				return -1;
			}
		}, 300);
    // eval(literals + code);
  }
  read (to_read) {
    // clean up unnecessary signs
    while (to_read.substr(0, 1) === ' ') {
		  var length = to_read.length - 1;
      to_read = to_read.substr(1, length);
    }
    while (to_read.substr(to_read.length - 1, 1) === ' ')
      to_read = to_read.substr(0, to_read.length - 1);

		var input;
		if (window.__io.text && window.__io.text != window.__io.last_text) {
			window.__io.last_text = window.__io.text;
			input = prompt(window.__io.text);
		}
		else
      input = prompt('');
    var the_console = document.getElementById('var');
		the_console.innerHTML += input;
		the_console.id = '';
    if (typeof to_read === 'object') {
      if (to_read instanceof Vector) {

      }
      // allow defaults objects like Math
		  else {
        return `${to_read} = ${input};`;
		  }
    }
    // here in runtime show the mistakes in assignings
		switch (window.__variables[to_read]) {
			case 'int':
				if (isNaN(Number(input)) || input != Math.trunc(input))
					return `write(\'${type_error.int}\'); window.__io.show = false ;`;
			  break;
			case 'double':
				if (isNaN(Number(input)))
					return `write(\'${type_error.double}\'); window.__io.show = false ;`;
			  break;
			case 'string':
			  break;
			case 'bool':
				if (isNaN(Number(input)) || input < 0 || input > 2)
					return `write(\'${type_error.bool}\'); window.__io.show = false ;`;
			  break;
		}
		if (window.__variables[to_read] == 'string') {
      return `${to_read} = \'${input}\';`;
		}
		else {
      return `${to_read} = ${input};`;
		}
  }
  write (text) {
    // window.__io.show is a flag, this avoids execution after errors
		if (window.__io.show) {
			if (typeof text === 'number' && isNaN(text))
			  return `write(\'${error.string_for_number}\'); window.__io.show = false ;`;
			if (typeof text === 'number' && !isFinite(text))
			  return `write(\'${error.infinity}\'); window.__io.show = false ;`;
		  window.__io.text = text;
      var the_console = document.getElementById('console');
      the_console.innerHTML += '<div class="lines"><div ' +
        'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
        '<div class="margin-line"> ' + text + '<div id="var" class="var"></div></div></div>';
		}
  }

}
