' ============================================================
'  FORJA · FORJA.vbs
'  Doble clic para abrir la app. Tambien lo usa la tarea de 6am.
'  Arranca el server local oculto y abre el navegador en
'  http://localhost:5050 (localhost es contexto seguro -> el
'  microfono del grabador funciona; file:// lo bloquearia).
' ============================================================

Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Carpeta donde vive este script
dir = fso.GetParentFolderName(WScript.ScriptFullName)
node = "C:\Program Files\nodejs\node.exe"

' Arranca el server oculto (ventana 0 = invisible). Si el puerto
' ya esta ocupado, node sale solo sin molestar.
sh.Run "cmd /c cd /d """ & dir & """ && """ & node & """ server.js", 0, False

' Dale 1.5s para levantar y abrí en Chrome
WScript.Sleep 1500
chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
If fso.FileExists(chrome) Then
  sh.Run """" & chrome & """ http://localhost:5050"
Else
  ' Fallback: Chrome en Program Files (x86) o instalación de usuario
  chrome86 = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
  chromeUser = fso.GetSpecialFolder(1).Drive & "\Users\" & sh.ExpandEnvironmentStrings("%USERNAME%") & "\AppData\Local\Google\Chrome\Application\chrome.exe"
  If fso.FileExists(chrome86) Then
    sh.Run """" & chrome86 & """ http://localhost:5050"
  ElseIf fso.FileExists(chromeUser) Then
    sh.Run """" & chromeUser & """ http://localhost:5050"
  Else
    sh.Run "http://localhost:5050"
  End If
End If
