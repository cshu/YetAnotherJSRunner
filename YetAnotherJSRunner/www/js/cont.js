var corFileDataDir;
var corFileExternalRootDirectory;
document.addEventListener('deviceready', function(){
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileDataDir){
		corFileDataDir = fileDataDir;
		fileDataDir.getFile('entrypoint', {create: true, exclusive: false}, function(entrypoint){
			entrypoint.file(function(entrypoint_file){
				var fr = new FileReader;
				fr.onerror=function(){throw new Error;};
				fr.onloadend=function(){
					if(this.result){
						var scr = document.createElement('script');
						scr.innerHTML=this.result;
						document.head.appendChild(scr);
					}else{
						document.body.appendChild(document.createTextNode('Entry point script '));
						var filein = document.createElement('input');
						filein.type='file';
						document.body.appendChild(filein);
						filein.onchange=function(){
							if(this.files.length){
								var entryRdr = new FileReader;
								entryRdr.onload=function(){
									var scr = document.createElement('script');
									scr.innerHTML=this.result;
									document.head.appendChild(scr);
								};
								entryRdr.readAsText(this.files[0]);
							}
						};
					}
				};
				fr.readAsText(entrypoint_file);
			}, function(){
				throw new Error;
			});
		}, function(){
			throw new Error;
		});
	}, function(){
		throw new Error;
	});
	if(!cordova.file.externalRootDirectory) return;
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileDataDir){
		corFileExternalRootDirectory = fileDataDir;
		//note for requesting permission this is necessary, otherwise <input type=file> fails to read file via file manager? (although it can still read via `Recent`?) (Anyway just do it for bootstrapping the first script.)
		fileDataDir.getFile('extern_entrypoint', {create: false, exclusive: false}, function(entrypoint){
		}, function(){
		});
	}, function(){
		throw new Error;
	});
});

