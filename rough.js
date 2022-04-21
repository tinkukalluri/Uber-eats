



snapshot = {
    docs: [{
        id: 1,
        userdata: {
            name: "tinku",
            age: "21"
        },
        data: () => {
            return snapshot.docs[0].userdata
        }
    }
    ]
}

json_str_data = JSON.stringify(snapshot)
json_parse_obj = JSON.parse(json_str_data)

new_list = snapshot.docs.map((doc) => { return doc.data() })
console.log(new_list)



