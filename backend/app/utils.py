import json

BAD_REQUEST = 400
OK = 200

def str_to_obj(docstring):
    return json.loads(docstring)

def to_pretty_json(value):
    return json.dumps(value, sort_keys=True, indent=4, separators=(",", ": "))


def update_table(table):    
    def update_row(id_field, row_id, value_field, value):

        def updateFunc(row):
            if(str(row[id_field]) == str(row_id)):
                return value
            return row[value_field]

        table["colCopy"]= table.apply(lambda x: updateFunc(x), axis=1)
        table[value_field] = table["colCopy"]
        table.drop(columns=["colCopy"])

    return update_row
