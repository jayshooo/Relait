#! /bin/bash

PS3='Please Select Simulator: '
options=("8" "11 Pro Max" "Quit")
item=''
select opt in "${options[@]}"
do
    case $opt in
        "8")
            item=$opt
            break
            ;;
        "11 Pro Max")
            item=$opt
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

echo $item

tsc && npm run reset-metro && react-native run-ios --simulator="iPhone $item"