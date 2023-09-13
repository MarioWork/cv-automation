const text = '{\n"hello"   :      "       world"  }';

const regex = /(".*?"|[^"\s]+)\s*/g;

//The $1 in the replace method retains the matched content within double quotes and non-whitespace sequences, while removing any extra white spaces.
console.log(text.replace(regex, '$1'));
