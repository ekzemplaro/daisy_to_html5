#! /bin/bash
#
#	bin/daisy_to_html.sh
#
#				Nov/01/2014
# ----------------------------------------------
DAISY_TO_HTML5=/home/uchida/kodama/daisy_to_html5
BIN=$DAISY_TO_HTML5"/bin"
DATA=$DAISY_TO_HTML5"/data"
# ----------------------------------------------
folder_src=$1
folder_target=$2
#
echo '*** go_henkan.sh *** start ***'
#
for folder in $folder_target $folder_target"/smil" $folder_target"/mp3" $folder_target"/ogg"
do
	if [ ! -d $folder ]
	then
		mkdir $folder
	fi
done
#
#
$BIN/go_list.sh $folder_src
mv $folder_src/list_smil.txt $folder_target"/smil"
#
# ----------------------------------------------
$BIN/go_sound_mp3.sh $folder_src $folder_target
#
# ----------------------------------------------
#
cp -p $folder_src"/ncc.html" $folder_target
#
$BIN/go_json.sh $folder_target
#
cp $DATA/master.html $folder_target"/"$folder_target".html"
cd $folder_target
ln -s $folder_target".html" index.html
#
echo '*** go_henkan.sh *** end ***'
# ----------------------------------------------
