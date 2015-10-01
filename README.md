# Style Dropper

## Description

It can copy/paste CSS styles for specified HTML elements by using native selector.
Make a JSON object for styles definition, and in/out as same format.
And the `style` means `HTML attribute: style`, so not include [ComputedStyles](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

## Main features

- Gets/Sets styles 

## Usage

#### Gets Styles

	StyleDropper.suck(element)
	StyleDropper.suck(mapKey[, element])
	StyleDropper.suck(query, mapKey[, element])
	
##### Parameters

|Name|Type|Description|
|:---:|:---:|:---|
|element|DOM Element|The native html DOM element, means to get styles from this element and includes all child nodes.|
|mapKey|string|Indicates html attribute name.|
|query|string|Using CSS selector rules for query elements.|

##### Returns
	{
		mapKey: 'your-map-key',
		query: 'your-query',
		data:{
			"keyMapsValue": {
				"background-color": '#222222',
				...
			},
			...
		}
	}

If you don't assign query and mapKey, the `data` would like this:
	
	{
		mapKey: '',
		query: '*',
		data:{
			"background-color": '#222222',
			...
			// other CSS styles
		}
	}
	
In this case, it would catch styles witch are first assigned.

##### Example

HTML

	<input my-attr="hello" style="padding-top:5px;font-size:20px;" />

Code

	StyleDropper.suck('my-attr', document.body);
	
Results
	
	{
		mapKey: 'my-attr',
		query: '[my-attr]',
		data:{
			"hello": {
				"padding-top" : '5px',
				"font-size" : '20px'
			}
		}
	}
	

#### Sets Styles

	StyleDropper.drop(object[, element])
	
##### Parameters

|Name|Type|Description|
|:---:|:---:|:---|
|object|PlainObject/String|Indicates the `suck` returns object or the same format JSON string.|
|element|DOM Element|The native html DOM element, means to set styles from this element and includes all child nodes.|

After exeution, the styles of HTML would change according to the input `object`, and rules are the same as gets styles section.


## License

Released under the [MIT license](http://www.opensource.org/licenses/MIT).
