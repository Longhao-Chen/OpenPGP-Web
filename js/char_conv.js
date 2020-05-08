function char_conv(char){
    var output='';
    for(var i=0;i<char.length;++i){
	switch(char[i]){
		case '"':
			output+="&quot;";
			break;
	    	case '&':
			output+="&amp;";
			break;
		case '<':
			output+="&lt;";
			break;
		case '>':
			output+="&gt;";
			break;
		default:
			output+=char[i];
	}
    }
    return output;
}