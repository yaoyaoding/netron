var hidet = hidet || {};
var json = json || require('./json');
var zip = zip || require('./zip');
var ndarray = ndarray || {};
var base = base || require('./base');

hidet.ModelFactory = class {

    match(context) {
        const identifier = context.identifier;
        const extension = identifier.split('.').pop().toLowerCase();
        switch (extension) {
            case 'json':
                {
                    const obj = context.open('json');
                    if (obj && obj.format && obj.format == 'netron') {
                        return 'netron.json';
                    }
                    break;
                }
        }
        return undefined;
    }

    open(context, match) {
        switch (match) {
            case 'netron.json':
                {
                    // return Model
                    return new Promise((resolve, reject) => {
                        // resolve(new hidet.Model(context.open('json')));
                        resolve(context.open('json'));
                    })
                }
            default:
                {
                    throw new Error("Unsupported Hidet format '" + match + "'.");
                }
        }
    };
};

// hidet.Model = class {

//     constructor(json_model) {
//         this._json_model = json_model
//         this._graphs = []
//         for (json_graph in json_model.graphs) {
//             this._graphs.push(new hidet.Graph(json_graph));
//         }
//     }

//     get identifier() {
//         return this._json_model.identifier || "";
//     }

//     get format() {
//         return this._json_model.format || "";
//     }

//     get imports() {
//         return this._json_model.imports || "";
//     }

//     get producer() {
//         return this._json_model.producer || "";
//     }

//     get domain() {
//         return this._json_model.domain || "";
//     }

//     get description() {
//         return this._json_model.description || "";
//     }

//     get author() {
//         return this._json_model.author || "";
//     }

//     get company() {
//         return this._json_model.company || "";
//     }

//     get source() {
//         return this._json_model.source || "";
//     }

//     get license() {
//         return this._json_model.license || null;
//     }

//     get metadata() {
//         return this._json_model.metadata || null;
//     }

//     get graphs() {
//         return this._graphs
//     }
// }

// hidet.Graph = class {

//     constructor(json_graph) {
//         this._json_graph = json_graph
//         this._nodes = [];
//         for (let node_json in json_graph.nodes || []) {
//             this._nodes.push(new hidet.Node(node_json));
//         }
//         this._inputs = [];
//         for (let input_json in json_graph.inputs || []) {
//             this._inputs.push(new hidet.Parameter(input_json))
//         }
//         this._outputs = [];
//         for (let output_json in json_graph.outputs || []) {
//             this._outputs.push(new hidet.Parameter(output_json))
//         }
//     }

//     get name() {
//         return this._json_graph.name || "";
//     }

//     get description() {
//         return this._json_graph.description || "";
//     }

//     get inputs() {
//         return this._inputs;
//     }

//     get outputs() {
//         return this._outputs
//     }

//     get nodes() {
//         return this._nodes
//     }

//     toString() {
//         return 'graph(' + this.name + ')';
//     }
// };

// hidet.Parameter = class {

//     constructor(param_json) {
//         this._param_json = param_json
//         this._arguments = []
//         for (let arg_json of param_json.arguments || []) {
//             this._arguments.push(new hidet.Argument(arg_json))
//         }
//     }

//     get name() {
//         return this._param_json.name || "";
//     }

//     get visible() {
//         return this.param_json.visible || true;
//     }

//     get arguments() {
//         return this._arguments;
//     }
// };


// hidet.Node = class {

//     constructor(node_json) {
//         self.node_json = node_json
//     }

//     get type() {
//         return self.node_json.type
//     }

//     get name() {
//         return self.node_json.name
//     }

//     get description() {
//         return self.node_json.description
//     }

//     get attributes() {
//         return this._attributes;
//     }

//     get inputs() {
//         return this._inputs;
//     }

//     get outputs() {
//         return this._outputs;
//     }

//     get chain() {
//         return this._chain;
//     }
// };

// hidet.Argument = class {
//     get description() {
//         return "";
//     }

//     get initializer() {
//         return "";
//     }

//     get name() {
//         return "";
//     }

//     get type() {
//         return "";
//     }
// }

// hidet.Attribute = class {
//     constructor(context, op_type, domain, attribute) {}

//     get name() {
//         return this._name;
//     }

//     get type() {
//         return this._type;
//     }

//     get value() {
//         return this._value;
//     }

//     get description() {
//         return this._description;
//     }

//     get visible() {
//         return this._visible == false ? false : true;
//     }
// }



if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.ModelFactory = hidet.ModelFactory;
}