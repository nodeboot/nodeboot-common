const path = require("path");

function MetaHelper() {
}

MetaHelper.getDependenciesByAnnotationModuleName = function (dependencies, annotationName) {
  return dependencies.filter(function (dependency) {
    if (dependency.meta.name === annotationName) return dependency;
  });
};

MetaHelper.getFunctionsOfModulesAnnotatedWith = function (dependencies, moduleAnnotationName, functionAnnotationName) {
  var modulesAndFunctions = []
  for (var dependency of dependencies) {
    if (dependency.meta.name !== moduleAnnotationName) continue;
    modulesAndFunctions[dependency.meta.moduleName] = []
    for (let functionName in dependency.functions) {
      var annotations = dependency.functions[functionName];
      for (let annotation of annotations) {
        if (typeof annotation.name !== 'undefined' && annotation.name === functionAnnotationName) { 
          var instanceId = MetaHelper.getInstanceId(dependency)
          modulesAndFunctions.push({functionName, ...annotation, instanceId})
        }
      }
    }
  }

  return modulesAndFunctions;
};

MetaHelper.findAnnotationOfFunction = function (dependency, functionName, annotationName) {
  var annotations = dependency.functions[functionName];
  for (annotation of annotations) {
    if (annotation.name == annotationName) {
      return annotation;
    }
  }
};

MetaHelper.getInstanceId = function(dependency){
  if (typeof dependency.meta.arguments.name !== 'undefined') {
    return dependency.meta.arguments.name;
  } else {
    let fileNameWithoutExt = path.basename(dependency.meta.location).replace(".js", "").trim();
    return fileNameWithoutExt.charAt(0).toLowerCase() + fileNameWithoutExt.slice(1);
  }
}

module.exports = MetaHelper;
