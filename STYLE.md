# Code Style
The styling below should be used at all times when contributing JavaScript code to the Scorebook Library.

Please note that the styling below is heavily based on the [JQuery Core Style Guidlines](http://docs.jquery.com/JQuery_Core_Style_Guidelines "JQuery/StyleGuidelines").

## JSLint
All files that are used in the public build are checked using [JSLint](http://www.jslint.com/ "JSLint website").

The following are to be ignored when using Library/core.js:
* `Combine this with the previous 'var' statement`.

  This is being ignored because in some cases it is more efficient to declare variables in different parts of a function. This particularly important when an expression within an assignment could take a reasonable amount of time to be executed.

* `'foobar' is already defined` and `unexpected 'foobar'`.

  This is to be ignored when it is used for a conditional assignment which is ensuring a value is not null/undefined.

## Spacing
* Tab size should be set to two spaces.
* Opening braces should always follow a space.
* On a single line use no more than single space (e.g. `var x = 10`, not `var x    = 10`).
* Use no whitespace at the end of a line.
* Use spaces between all operators (e.g. `+`, `=`, `===`, `:`, etc).
* Blank lines should contain no white space.

## Comments
* Comments should always have a space before them and use good english (e.g. `// Comment.`).
* For comments that require multiple lines use `/* ... */`.
* In line comments should always be placed above the line they reference and be preceeded by a blank line.

## Blocks
Always use correct blocks when writing if/while/for/etc statements (see correct use below).

    if (true === true) {
        doSomething();
    }
    else {
        doSomethingElse();
    }

## Brackets
Brackets should not use additional spaces (see below).

    // Correct.
    (x, y)

    // Incorrect.
    ( x, y )
    
Brackets should always be used around conditional expressions and when there are multiple expressions (see below).

    if (true === true) {
        doSomething();
    }

    x = number1 + (number2 * number3)

## Equality
Always use `===` or `!==` not `==` or `!==` when checking equality.

## Assignment
Assignments should always have a semicolon after them.

Semicolons should always be followed by an endline.

Assignments in a declaration should always be on their own line. Declarations that don't have an assignment should be listed together at the start of the declaration. For example:

    var a, b, c,
        test = true,
        test2 = false;

## Regular Expressions
All RegExp operations should be done using `.test()` and `.exec().`

## Strings
Strings should always use double-quotes instead of single-quotes.

## Naming
This is a general convention in JavaScript and other languages.
* All variable identifiers should use `camelCaps` and they should be nouns.
* All function identifiers should also use `camelCaps` and take the form `verbNoun` or similar.
