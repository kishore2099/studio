// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { JaegerExporter } = await import('@opentelemetry/exporter-jaeger');
    
    const exporter = new JaegerExporter({
      // Configure as needed
      endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
    });
    
    const sdk = new NodeSDK({
      traceExporter: exporter,
      serviceName: 'ai-coaching-app',
    });
    
    sdk.start();
  }
}
