
#! /bin/bash
#
#	bin/go_list.sh
#
#				Nov/01/2014
# ----------------------------------------------
#
echo '*** go_list.sh *** start ***'
#
cd $1
echo "SMIL_PARSER=/home/uchida/kodama/daisy_convert/smil_parser" > go_tmp
ls *.smil | awk '{print "$SMIL_PARSER/smil_parser.php",$1}' >> go_tmp
#
bash ./go_tmp > list_smil.txt
#
echo '*** go_list.sh *** end ***'
# ----------------------------------------------
