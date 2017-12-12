#!/bin/bash

# Instructions:
# repalce 3 with any other number

# Create post
function_post() {
        echo ""
        echo ""
        echo "~~** Test Posts **~~"
        echo "Inject Posts"
        echo ""
    i=0
        while [ "$i" -le 1000  ]
    do
        echo "#$i"
        user=$(echo $RANDOM | tr '[0-9]' '[a-zA-Z]')
        title=$(echo $RANDOM | tr '[0-9]' '[a-zA-Z]')
        body=$(echo $RANDOM | tr '[0-9]' '[a-zA-Z]')
        curl -d "userId=$user&title=$title&body=$body" -X POST http://128.110.153.109/posts/create/
        i=$(( $i + 1 ))
    done
    echo Posts created successfully!
    echo
}

function_post
