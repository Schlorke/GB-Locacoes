# Instruções para configurar o Prettier no VS Code

## Verificações importantes:

1. **Extensão do Prettier instalada**:
   - Certifique-se de que a extensão "Prettier - Code formatter" está instalada no VS Code
   - ID da extensão: esbenp.prettier-vscode

2. **Verificar configurações do usuário**:
   - Abra VS Code settings (Ctrl+,)
   - Procure por "format on save" e certifique-se de que está habilitado
   - Procure por "default formatter" e selecione "Prettier"

3. **Comandos úteis**:
   - Ctrl+Shift+P -> "Format Document" (para formatar manualmente)
   - Ctrl+Shift+P -> "Format Document With..." -> Selecionar Prettier

4. **Possíveis soluções se não funcionar**:
   - Reinicie o VS Code completamente
   - Desabilite outras extensões de formatação (como Beautify)
   - Verifique se não há conflitos nas configurações globais do usuário

5. **Formatação manual via terminal**:

   ```bash
   # Formatar todos os arquivos
   pnpm format

   # Formatar arquivo específico
   npx prettier --write "caminho/para/arquivo.tsx"
   ```

## Status das configurações:

✅ .prettierrc configurado
✅ .vscode/settings.json configurado  
✅ package.json com scripts de formatação
✅ Prettier funcionando via terminal
✅ ESLint configurado para trabalhar com Prettier
