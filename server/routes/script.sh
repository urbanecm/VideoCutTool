from=$1
to=$2
in=$3
out=$4
echo $1
echo $2
echo $3
echo "He"
echo $4
ffmpeg -i $in -ss $from -t $to -async 1 $out
