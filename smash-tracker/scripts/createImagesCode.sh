printf "const Images = {\n"
for f in *.png; do
    FILE="${f%.png}"
    printf "\t'$FILE': require('./assets/images/icons/$f'),\n"
done
printf "};\n"
