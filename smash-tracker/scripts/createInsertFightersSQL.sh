input="Fighters.txt"
while read -r line
do
  fighter="${line%%:*}"
  printf "INSERT INTO public.fighter(icon, name) VALUES($fighter, $fighter);\n"
done < "$input"
