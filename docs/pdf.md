## Create Booklet

    pdfbook --short-edge --frame true --scale 0.95 file.pdf

## Convert PDF to JPG
```bash
vips copy sample.pdf[dpi=300,page=0] sample-page-1.jpg
```
## Optimize PDF
```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```
```
-dPDFSETTINGS=/screen	Has a lower quality and smaller size. (72 dpi)
-dPDFSETTINGS=/ebook	Has a better quality, but has a slightly larger size (150 dpi)
-dPDFSETTINGS=/prepress	Output is of a higher size and quality (300 dpi)
-dPDFSETTINGS=/printer	Output is of a printer type quality (300 dpi)
-dPDFSETTINGS=/default	Selects the output which is useful for multiple purposes. Can cause large PDFS.
```