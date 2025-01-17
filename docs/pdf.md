## Create pdf from images
```
montage 01.jpg 02.jpg 03.jpg -tile 1x1 -geometry 1000 -page A4 -compress jpeg -quality 75 -background white my-document.pdf
```

## Create Booklet

    pdfbook --short-edge --frame true --scale 0.95 file.pdf

## Split pdf

```bash
pdftk input.pdf cat 1 output output_p1.pdf
```
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
## Extract images from PDF
```bash
pdfimages -all file.pdf .
```
[Source](https://askubuntu.com/questions/150100/extracting-embedded-images-from-a-pdf)