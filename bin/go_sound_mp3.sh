#! /bin/bash
#
#	bin/go_sound_mp3.sh
#
#				Nov/01/2014
# ----------------------------------------------
#
echo '*** go_sound_mp3.sh *** start ***'
#
cp -p $1/*.mp3 $2/mp3
#
cd $2/mp3
#
ls *.mp3 | awk '{print "sox",$1,substr($1,0,8)".ogg"}' > go_tmp_conv
bash ./go_tmp_conv
#
#cd ..
#mv $1/*.ogg $2/ogg
mv *.ogg ../ogg
#
echo '*** go_sound_mp3.sh *** end ***'
# ----------------------------------------------
