import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/sanity';

const LOGO_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzg4IiBoZWlnaHQ9IjE2MSIgdmlld0JveD0iMCAwIDc4OCAxNjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMjdfMzc4KSI+CjxwYXRoIGQ9Ik0yMTMuNjcyIDU3LjI5MjZDMjEzLjMzMSA1My44NTUxIDIxMS44NjggNTEuMTg0NyAyMDkuMjgzIDQ5LjI4MTJDMjA2LjY5NyA0Ny4zNzc4IDIwMy4xODkgNDYuNDI2MSAxOTguNzU3IDQ2LjQyNjFDMTk1Ljc0NiA0Ni40MjYxIDE5My4yMDMgNDYuODUyMyAxOTEuMTI5IDQ3LjcwNDVDMTg5LjA1NSA0OC41Mjg0IDE4Ny40NjQgNDkuNjc5IDE4Ni4zNTcgNTEuMTU2MkMxODUuMjc3IDUyLjYzMzUgMTg0LjczNyA1NC4zMDk3IDE4NC43MzcgNTYuMTg0N0MxODQuNjggNTcuNzQ3MiAxODUuMDA3IDU5LjExMDggMTg1LjcxNyA2MC4yNzU2QzE4Ni40NTYgNjEuNDQwMyAxODcuNDY0IDYyLjQ0ODkgMTg4Ljc0MyA2My4zMDExQzE5MC4wMjEgNjQuMTI1IDE5MS40OTkgNjQuODQ5NCAxOTMuMTc1IDY1LjQ3NDRDMTk0Ljg1MSA2Ni4wNzEgMTk2LjY0MSA2Ni41ODI0IDE5OC41NDQgNjcuMDA4NUwyMDYuMzg1IDY4Ljg4MzVDMjEwLjE5MiA2OS43MzU4IDIxMy42ODYgNzAuODcyMiAyMTYuODY4IDcyLjI5MjZDMjIwLjA1IDczLjcxMzEgMjIyLjgwNSA3NS40NjAyIDIyNS4xMzUgNzcuNTM0MUMyMjcuNDY0IDc5LjYwOCAyMjkuMjY4IDgyLjA1MTEgMjMwLjU0NyA4NC44NjM2QzIzMS44NTQgODcuNjc2MSAyMzIuNTIxIDkwLjkwMDYgMjMyLjU1IDk0LjUzNjlDMjMyLjUyMSA5OS44Nzc4IDIzMS4xNTggMTA0LjUwOSAyMjguNDU5IDEwOC40MjlDMjI1Ljc4OCAxMTIuMzIxIDIyMS45MjUgMTE1LjM0NyAyMTYuODY4IDExNy41MDZDMjExLjgzOSAxMTkuNjM2IDIwNS43NzQgMTIwLjcwMiAxOTguNjcyIDEyMC43MDJDMTkxLjYyNiAxMjAuNzAyIDE4NS40OSAxMTkuNjIyIDE4MC4yNjMgMTE3LjQ2M0MxNzUuMDY0IDExNS4zMDQgMTcxLjAwMSAxMTIuMTA4IDE2OC4wNzUgMTA3Ljg3NUMxNjUuMTc4IDEwMy42MTQgMTYzLjY1OCA5OC4zNDM4IDE2My41MTYgOTIuMDY1M0gxODEuMzcxQzE4MS41NyA5NC45OTE1IDE4Mi40MDggOTcuNDM0NyAxODMuODg1IDk5LjM5NDlDMTg1LjM5MSAxMDEuMzI3IDE4Ny4zOTMgMTAyLjc5IDE4OS44OTMgMTAzLjc4NEMxOTIuNDIyIDEwNC43NSAxOTUuMjc3IDEwNS4yMzMgMTk4LjQ1OSAxMDUuMjMzQzIwMS41ODQgMTA1LjIzMyAyMDQuMjk3IDEwNC43NzggMjA2LjU5OCAxMDMuODY5QzIwOC45MjggMTAyLjk2IDIxMC43MzIgMTAxLjY5NiAyMTIuMDEgMTAwLjA3N0MyMTMuMjg4IDk4LjQ1NzQgMjEzLjkyOCA5Ni41OTY2IDIxMy45MjggOTQuNDk0M0MyMTMuOTI4IDkyLjUzNDEgMjEzLjM0NSA5MC44ODY0IDIxMi4xOCA4OS41NTExQzIxMS4wNDQgODguMjE1OSAyMDkuMzY4IDg3LjA3OTUgMjA3LjE1MiA4Ni4xNDJDMjA0Ljk2NCA4NS4yMDQ1IDIwMi4yOCA4NC4zNTIzIDE5OS4wOTggODMuNTg1MkwxODkuNTk1IDgxLjE5ODlDMTgyLjIzNyA3OS40MDkxIDE3Ni40MjggNzYuNjEwOCAxNzIuMTY2IDcyLjgwNEMxNjcuOTA1IDY4Ljk5NzIgMTY1Ljc4OCA2My44NjkzIDE2NS44MTcgNTcuNDIwNUMxNjUuNzg4IDUyLjEzNjQgMTY3LjE5NSA0Ny41MTk5IDE3MC4wMzYgNDMuNTcxQzE3Mi45MDUgMzkuNjIyMiAxNzYuODM5IDM2LjUzOTggMTgxLjgzOSAzNC4zMjM5QzE4Ni44MzkgMzIuMTA4IDE5Mi41MjEgMzEgMTk4Ljg4NSAzMUMyMDUuMzYyIDMxIDIxMS4wMTYgMzIuMTA4IDIxNS44NDUgMzQuMzIzOUMyMjAuNzAzIDM2LjUzOTggMjI0LjQ4MiAzOS42MjIyIDIyNy4xOCA0My41NzFDMjI5Ljg3OSA0Ny41MTk5IDIzMS4yNzEgNTIuMDkzNyAyMzEuMzU3IDU3LjI5MjZIMjEzLjY3MloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNTkuODEzIDMyLjE5MzJWMTE5LjQ2NkgyNDEuMzYxVjMyLjE5MzJIMjU5LjgxM1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNzEuMzk0IDExOS40NjZWMzIuMTkzMkgyODkuODQ1VjEwNC4yNTNIMzI3LjI2VjExOS40NjZIMjcxLjM5NFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0zMzUuODggMTE5LjQ2NlYzMi4xOTMySDM1NC4zMzFWNzAuNjczM0gzNTUuNDgyTDM4Ni44ODggMzIuMTkzMkg0MDkuMDA1TDM3Ni42MTggNzEuMjY5OUw0MDkuMzg4IDExOS40NjZIMzg3LjMxNEwzNjMuNDA4IDgzLjU4NTJMMzU0LjMzMSA5NC42NjQ4VjExOS40NjZIMzM1Ljg4WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTQxNS4wMTQgMTE5LjQ2NlYzMi4xOTMySDQzMy40NjZWMTA0LjI1M0g0NzAuODgxVjExOS40NjZINDE1LjAxNFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik00NzkuNSAxMTkuNDY2VjMyLjE5MzJINTM4LjMwN1Y0Ny40MDYySDQ5Ny45NTJWNjguMjAxN0g1MzUuMjgxVjgzLjQxNDhINDk3Ljk1MlYxMDQuMjUzSDUzOC40NzdWMTE5LjQ2Nkg0NzkuNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik01NjQuNDE5IDExOS40NjZINTQ0LjY0Nkw1NzQuNzc0IDMyLjE5MzJINTk4LjU1M0w2MjguNjM4IDExOS40NjZINjA4Ljg2NUw1ODcuMDA0IDUyLjEzNjRINTg2LjMyM0w1NjQuNDE5IDExOS40NjZaTTU2My4xODMgODUuMTYxOUg2MDkuODg4Vjk5LjU2NTNINTYzLjE4M1Y4NS4xNjE5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTYzNS41NDIgMTE5LjQ2NlYzMi4xOTMySDY2OS45NzRDNjc2LjU2NSAzMi4xOTMyIDY4Mi4xOSAzMy4zNzIyIDY4Ni44NDkgMzUuNzMwMUM2OTEuNTM2IDM4LjA1OTcgNjk1LjEwMiA0MS4zNjkzIDY5Ny41NDUgNDUuNjU5MUM3MDAuMDE3IDQ5LjkyMDUgNzAxLjI1MiA1NC45MzQ3IDcwMS4yNTIgNjAuNzAxN0M3MDEuMjUyIDY2LjQ5NzIgNzAwLjAwMiA3MS40ODMgNjk3LjUwMiA3NS42NTkxQzY5NS4wMDIgNzkuODA2OCA2OTEuMzggODIuOTg4NiA2ODYuNjM2IDg1LjIwNDVDNjgxLjkyIDg3LjQyMDUgNjc2LjIxIDg4LjUyODQgNjY5LjUwNSA4OC41Mjg0SDY0Ni40NTFWNzMuNjk4OUg2NjYuNTIyQzY3MC4wNDUgNzMuNjk4OSA2NzIuOTcxIDczLjIxNTkgNjc1LjMwMSA3Mi4yNUM2NzcuNjMgNzEuMjg0MSA2NzkuMzYzIDY5LjgzNTIgNjgwLjUgNjcuOTAzNEM2ODEuNjY0IDY1Ljk3MTYgNjgyLjI0NyA2My41NzEgNjgyLjI0NyA2MC43MDE3QzY4Mi4yNDcgNTcuODA0IDY4MS42NjQgNTUuMzYwOCA2ODAuNSA1My4zNzIyQzY3OS4zNjMgNTEuMzgzNSA2NzcuNjE2IDQ5Ljg3NzggNjc1LjI1OCA0OC44NTUxQzY3Mi45MjkgNDcuODA0IDY2OS45ODggNDcuMjc4NCA2NjYuNDM3IDQ3LjI3ODRINjUzLjk5NFYxMTkuNDY2SDYzNS41NDJaTTY4Mi42NzMgNzkuNzVMNzA0LjM2MyAxMTkuNDY2SDY4My45OTRMNjYyLjc3MiA3OS43NUg2ODIuNjczWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTc4My42ODkgMzIuMTkzMlYxMTkuNDY2SDc2Ny43NTJMNzI5Ljc4MyA2NC41MzY5SDcyOS4xNDRWMTE5LjQ2Nkg3MTAuNjkyVjMyLjE5MzJINzI2Ljg4NUw3NjQuNTU2IDg3LjA3OTVINzY1LjMyM1YzMi4xOTMySDc4My42ODlaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RfMjdfMzc4KSI+CjxwYXRoIGQ9Ik0zNS4yMzQ2IDEyNC4xNUMzNS4xNzMxIDEyMy40ODIgMzUuMTMzOCAxMjIuODAxIDM1LjExODQgMTIyLjEwOEwzNS4xMTgzIDExOS45MzZINjkuMTU0NlYxMDcuNjE5SDM1LjExNzlDMzUuMTE3IDY5LjQ2NDQgMzUuMTE4NCAxMy4xOTI0IDM1LjExODQgMTMuMTkyNEMzMi4zNjE4IC00Ljk2MDE2IDYuNTkxNDIgLTMuODI1NjIgNC4wMDAwMiAxMy4xOTI0TDQgMTAwLjcxNEM0LjU3NjE4IDEyMS4zMDYgMTcuMzIyMyAxMzUuODQzIDMxLjU1MjkgMTQ0LjI1NkM0MS4yOTA3IDE1MC4wMTMgNTIuMDQ5OCAxNTMgNTkuNzU0MiAxNTNIMTAzLjUxNVYxNDAuNjgySDQyLjQwM0M0MS4zMDgyIDEzOS4zODkgNDAuMjc2MyAxMzcuOTg1IDM5LjM1MjQgMTM2LjQ2OEg4Ni4wMTA2VjEyNC4xNUgzNS4yMzQ2WiIgZmlsbD0iIzIwMjAyMCIvPgo8L2c+CjwvZGVmcz4KPC9zdmc+';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function clampTitle(title: string) {
  return title.length > 110 ? `${title.slice(0, 107)}…` : title;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = 'SILKLEARN Blog';
  let eyebrow = 'Blog';

  try {
    const post = await getPostBySlug(slug);
    title = clampTitle(post?.title ?? title);
    eyebrow = post?.eyebrow ?? eyebrow;
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, #fcfdff 0%, #ffffff 58%, #f7f9fc 100%)',
          color: '#18181b',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 36%), radial-gradient(circle at bottom right, rgba(99,102,241,0.10), transparent 30%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: '28px',
            border: '1px solid rgba(24,24,27,0.08)',
            borderRadius: '24px',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: '76px',
            width: '96px',
            height: '6px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '80px',
            right: '80px',
            bottom: '76px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: '#4f46e5',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            <span>{eyebrow}</span>
            <span style={{ color: 'rgba(39,39,42,0.20)' }}>•</span>
            <img src={LOGO_SRC} alt="SILKLEARN" width="140" height="28" style={{ objectFit: 'contain' }} />
          </div>

          <div
            style={{
              maxWidth: '920px',
              color: '#18181b',
              fontSize: '52px',
              lineHeight: 1.08,
              letterSpacing: '-2px',
              fontWeight: 700,
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: 'rgba(39,39,42,0.46)',
              fontSize: '21px',
              fontWeight: 500,
            }}
          >
            silklearn.io/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
