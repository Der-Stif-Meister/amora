import React, { useEffect, useMemo, useState } from 'react'
import { Document, Page } from 'react-pdf'

type Props = {
  file: File | null
}

export default function PDFViewer({ file }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    setPageNumber(1)
    if (!file) {
      setObjectUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setObjectUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goPrev = () => setPageNumber((p) => Math.max(1, (p || 1) - 1))
  const goNext = () => setPageNumber((p) => Math.min((numPages || 1), (p || 1) + 1))

  const displayFile = useMemo(() => objectUrl || undefined, [objectUrl])

  return (
    <div className="pdf-viewer">
      {!file && <div className="empty">No PDF selected — choose one above.</div>}

      {file && (
        <>
          <div className="controls">
            <button onClick={goPrev} disabled={pageNumber <= 1}>&larr;</button>
            <span>
              Page {pageNumber} {numPages ? `of ${numPages}` : ''}
            </span>
            <button onClick={goNext} disabled={numPages ? pageNumber >= numPages : true}>&rarr;</button>
          </div>

          <div className="document">
            <Document file={displayFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} width={800} />
            </Document>
          </div>
        </>
      )}
    </div>
  )
}
