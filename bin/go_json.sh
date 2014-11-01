#! /bin/bash
#
#	bin/go_json.sh
#
#				Nov/01/2014
# ----------------------------------------------
DAISY_TO_HTML5=/home/uchida/kodama/daisy_to_html5
BIN=$DAISY_TO_HTML5"/bin"
#DAISY_TO_JSON=/home/uchida/kodama/daisy_convert/daisy_to_json
#
folder_target=$1
echo '*** go_json.sh *** start ***'
#
cd $folder_target
nkf -w ncc.html | sed 's/Shift_JIS/UTF-8/' > tmp001.html
#
$BIN/daisy_to_json.php tmp001.html > ncc.json
#
echo '*** go_json.sh *** end ***'
# ----------------------------------------------
