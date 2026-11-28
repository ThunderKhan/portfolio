"""Read the public resume PDF with Poppler; report only allowlisted content indicators.

Never print extracted text, contact details, or credential numbers into CI logs.
Presence checks are triage, not proof of factual consistency.
"""
import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path

pdf = Path("public/Ayan_Khan_Resume.pdf")
result = {"sha256": hashlib.sha256(pdf.read_bytes()).hexdigest()}
reader = shutil.which("pdftotext")
if not reader:
    result["status"] = "pdftotext unavailable"
else:
    proc = subprocess.run([reader, "-layout", str(pdf), "-"], capture_output=True, timeout=20, check=False)
    if proc.returncode:
        result["status"] = "PDF extraction failed"
    else:
        content = re.sub(r"\s+", " ", proc.stdout.decode("utf-8", errors="replace")).lower()
        result["status"] = "text extracted" if content.strip() else "no extractable text"
        result["indicators"] = {
            "runtime_conditions": "runtime conditions" in content,
            "vsph": "vsph" in content,
            "micro1": "micro1" in content,
            "diff2test": "diff2test" in content,
            "refute": bool(re.search(r"\brefute\b", content)),
            "webclerk": "webclerk" in content,
            "education_cgpa_8_82": "8.82" in content,
            "degree_year_2028": "2028" in content,
            "iet_grid": "iet grid" in content,
            "second_runner_up": bool(re.search(r"second runner.up|2nd runner.up|third place|3rd place", content)),
            "stanford_course": "regression and classification" in content,
            "nasa_arset": "remote sensing" in content,
        }
print(json.dumps(result, indent=2))
