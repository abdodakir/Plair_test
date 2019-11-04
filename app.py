from flask import Flask, jsonify, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/node/<id>', methods=['GET'])
def node(id):
    if id != "":
        # sql requet
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute("select * from nodes where nodes.id =?", (id,))        
        node = cur.fetchone()
        conn.close()
        return jsonify({"success": True, "node": {"id": node[0], "node": node[1], "prop1": node[2], "prop2": node[3], "prop3": node[4]}}), 200
    else:
        return jsonify({"success": False, "action": "not exist"}), 404

@app.route('/update_node', methods=['POST'])
def update_node():
    data = request.get_json()
    if "action" in data and data["action"] == "update_node":
        # sql requet
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        sql = "UPDATE nodes SET property_1 =?, property_2 =?, property_3 =? WHERE id =?"
        val = (data["property1"], data["property2"], data["property3"], int(data["node"]),)
        cur.execute(sql, val)
        conn.commit()
        conn.close()
        return jsonify({"success": True, "node": {"node": 1, "prop": "dakir"}}), 200
    else:
        return jsonify({"success": False, "action": "not exist"}), 404

if __name__ == '__main__':
    app.run(debug=True)