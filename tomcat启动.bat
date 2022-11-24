@echo 非Eclipse的Tomcat的访问地址:
@echo     我的 tomcat主页文件位置: F:\IDE\tomcat\apache-tomcat-10.0.14\webapps\ROOT\index.html
@echo.
@echo     tomcat配置: F:\IDE\tomcat\apache-tomcat-10.0.14\conf\Catalina\localhost\webgl_learning_zz.xml
@echo     项目路径: E:\Gitee\zclxy\webgl_learning_zz
@echo.
@echo   http://localhost:8080/webgl_learning_zz
@echo   http://localhost:8080/webgl_learning_zz/eBook/WebGL编程指南/WebGL_Guide_Code/WebGL_Guide_Code/ch10/_1001_RotateObject_02.html
@echo.

f:
cd F:\IDE\tomcat\apache-tomcat-10.0.14\bin
call startup.bat

pause