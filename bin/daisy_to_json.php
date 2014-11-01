#! /usr/bin/php
<?php
// ------------------------------------------------------------------
//	daisy_to_json.php
//
//					Oct/21/2011
//
// ------------------------------------------------------------------
$path="/var/www/data_base/common/php_common";
set_include_path (get_include_path() . PATH_SEPARATOR . $path);

// ------------------------------------------------------------------
function to_label_proc ($smil_file,$hash_smil)
{
	if (strlen ($smil_file) != 14)
		{
		exit ();
		}

	$rvalue = $hash_smil[$smil_file];

	return $rvalue;
}

// ------------------------------------------------------------------
function str_gen_proc ($section,$tag,$text,$hash_smil)
{
	$pp = substr ($text->attributes()->href,3,6);
	$smil_file = "ptk" . $pp . ".smil";

	$label = to_label_proc ($smil_file,$hash_smil);

	$unit_aa = array ();

	$unit_aa['section'] = $section;
	$unit_aa['tag'] = $tag;
	$unit_aa['text'] = $text;
	$unit_aa['audio'] = $label;

	return $unit_aa;
}

// ------------------------------------------------------------------
function hash_smil_create_proc ()
{
	$smil_list = @file ("smil/list_smil.txt");

	$hash_smil = array ();

	foreach ($smil_list as $obj)
		{
		$mtx = explode ("\t",$obj);
		$key = $mtx[0];
		$value = substr ($mtx[1],0,7);

		$hash_smil[$key] = $value;
		}

	return	$hash_smil;	
}

// ------------------------------------------------------------------
$xml_filename = $argv[1];

// print	"*** 開始 ***\n";
$hash_smil = hash_smil_create_proc ();


$xml_string = file_get_contents ($xml_filename);

// $xml_string = mb_convert_encoding ($xml_string,'UTF-8','Shift-JIS');
// $xml_string = str_replace ('Shift_JIS','UTF-8',$xml_string);

$root = simplexml_load_string ($xml_string);

$track = 0;
$section = 0;

$data_all = array ();

foreach ($root->body->children () as $key_hh => $value)
	{
	if (($key_hh != "div") && ($key_hh != "span"))
		{
		if ($key_hh === "h1")
			{
			$section += 1;
			}

		$unit_aa = str_gen_proc ($section,$key_hh,$value->a[0],$hash_smil);
		$data_all["track_" . (string)$track]= $unit_aa;
		$track += 1;

		}
	}

$str_json = json_encode ($data_all);

print $str_json;


// print	"*** 終了 ***\n";
// ------------------------------------------------------------------
?>
