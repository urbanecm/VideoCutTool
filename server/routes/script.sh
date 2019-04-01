from=$1
to=$2
in=$3
out=$4
ffmpeg -i $in -ss $from -t $to -async 1 $out
