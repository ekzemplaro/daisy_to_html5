// -----------------------------------------------------------------------
//	koho_sep2011.js
//
//					Oct/23/2011
//
// -----------------------------------------------------------------------
jQuery (function ()
{
//	jQuery("#outarea_aa").text ("*** start *** koho_sep2011.js ***");

	var file_json = "ncc.json";

	jQuery.getJSON (file_json,function (data_received)
		{
		navi_gen_proc (data_received);

		contents_start_gen_proc (data_received);

		jQuery ("button").click (function ()
			{
			contents_gen_proc (data_received,this.id);
			});
		});


//	jQuery("#outarea_hh").text ("*** end *** koho_sep2011.js ***");
});

// -----------------------------------------------------------------------
// [2]:
function navi_gen_proc (data_received)
{
	var str_out = "";

	for (var track in data_received)
		{
		var unit = data_received[track];
		if (unit.tag === "h1")
			{
			str_out += "<button id=" + unit.section + ">";
			str_out += unit.text[0] + " ";
			str_out += "</button>";
//			str_out += unit.section + " ";
			str_out += "<br />";
			}
		}

	jQuery("#navi").html (str_out);
}

// -----------------------------------------------------------------------
// [4]:
function contents_start_gen_proc (data_received)
{
	var str_out = "<h2>";

	str_out += data_received.track_0.text[0];

	str_out += "</h2>";

	var cc_org = jQuery ("#contents").html ();

	str_out += cc_org;

	jQuery("#contents").html (str_out);
}

// -----------------------------------------------------------------------
// [6]:
function contents_gen_proc (data_received,section_selected)
{
	var str_out = "";

//	str_out += section_selected + "<p />";

	var tag_before = "h1";

	for (var track in data_received)
		{
		var unit = data_received[track];

		if (unit.section == section_selected)
			{
			if (unit.tag === "h1")
				{
				str_out += "<h2>";
				str_out += unit.text[0];
				str_out += "</h2>";
				}

			str_out += audio_gen_proc (track,unit,tag_before);
			tag_before = unit.tag;
			}
		}

	jQuery("#contents").html (str_out);
}

// -----------------------------------------------------------------------
// [6-4]:
function audio_gen_proc (track,unit,tag_before)
{
	var tag_level = 0 + unit.tag.substring (1,2);
	var tag_level_before = 0 + tag_before.substring (1,2);

	var delt = tag_level - tag_level_before;

	var str_out = "";

	if (delt === 1)
		{
		str_out += "<blockquote>";
		}
	else if (delt === -1)
		{
		str_out += "</blockquote>";
		}
	else if (delt === -2)
		{
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		}
	else if (delt === -3)
		{
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		}
	else if (delt === -4)
		{
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		str_out += "</blockquote>";
		}

	str_out += "<audio controls> <source src=\"mp3/";
	str_out += unit.audio + ".mp3\">";
	str_out += "<source src=\"ogg/";
	str_out += unit.audio + ".ogg\">";
	str_out += "</audio>";
	str_out += unit.text[0] + " ";
//	str_out += unit.section + " ";
//	str_out += track + " ";
//	str_out += unit.tag + " ";
//	str_out += delt;

str_out += unit.audio;

	str_out += "<br />";


	return str_out;
}

// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
