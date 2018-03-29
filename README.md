# Bing-Vue

### Webpack4 配置
#### source-maps
- source-map:把映射文件生成到单独的文件，最完整最慢
- cheap-module-source-map:在一个单独的文件中产生一个不带列映射的Map
- eval-source-map:使用eval打包源文件模块，在同一个文件中生成完整sourcemap
- cheap-module-eval-source-map:sourcemap和打包后的JS同行显示，没有映射列