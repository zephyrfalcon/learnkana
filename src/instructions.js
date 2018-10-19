import React from 'react';

// The instructions are really just HTML. Instead of loading it from an 
// external source, or sticking a bunch of HTML in the Instructions
// component, I am putting it here.

const instructions = (
    <div className="instructions">
      <p>So yeah...</p>
      <p>Like dis...</p>
      <p>Sources:
          <ul>
              <li><a href="https://en.wikipedia.org/wiki/Katakana">Katakana table</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Hiragana">Hiragana table</a></li>
          </ul>
      </p>
    </div>
);

export { instructions };
