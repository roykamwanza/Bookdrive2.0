import os
import re
from pathlib import Path

root = Path(r'c:\Users\xox\Desktop\Bookdrive2.0\src\passager_workshop')
for path in sorted(root.rglob('*.ts')):
    stem = path.stem
    new_stem = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', stem)
    new_stem = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1_\2', new_stem).lower()
    new_path = path.with_name(new_stem + path.suffix)
    if new_path != path and not new_path.exists():
        os.rename(path, new_path)
        print(f'{path.name} -> {new_path.name}')
